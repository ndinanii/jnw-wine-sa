const API_VERSION = import.meta.env.SHOPIFY_API_VERSION || "2026-01";

const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int = 12) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          productType
          tags
          images(first: 3) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                sku
              }
            }
          }
        }
      }
    }
  }
`;

const GET_PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            sku
          }
        }
      }
    }
  }
`;

const CREATE_CART_QUERY = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_PRODUCT_HANDLES_QUERY = `
  query ProductHandles($first: Int = 100) {
    products(first: $first) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;

function getConfig() {
  const rawDomain = import.meta.env.SHOPIFY_STORE_DOMAIN;
  const domain = rawDomain
    ? rawDomain.replace(/^https?:\/\//, "").replace(/\/+$/, "")
    : "";
  const token =
    import.meta.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN ||
    import.meta.env.SHOPIFY_STOREFRONT_TOKEN_SERVER;
  const configured = Boolean(domain && token);
  return { domain, token, configured };
}

export async function shopifyFetch(query, variables = {}) {
  const { domain, token, configured } = getConfig();
  if (!configured) {
    return { data: null, errors: [{ message: "Shopify configuration missing." }] };
  }

  let response;
  try {
    response = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (error) {
    return { data: null, errors: [{ message: `Shopify request failed: ${error.message}` }] };
  }

  if (!response.ok) {
    return { data: null, errors: [{ message: `Shopify API failed (${response.status}).` }] };
  }

  return response.json();
}

export async function getProducts(first = 24) {
  const json = await shopifyFetch(GET_PRODUCTS_QUERY, { first });
  return json.data?.products?.edges?.map((edge) => edge.node) ?? [];
}

export async function getProductByHandle(handle) {
  const json = await shopifyFetch(GET_PRODUCT_BY_HANDLE_QUERY, { handle });
  return json.data?.product ?? null;
}

export async function getProductHandles(first = 100) {
  const json = await shopifyFetch(GET_PRODUCT_HANDLES_QUERY, { first });
  return json.data?.products?.edges?.map((edge) => edge.node?.handle).filter(Boolean) ?? [];
}

export async function createCartCheckout(lineItems) {
  const lines = lineItems.map((item) => ({
    merchandiseId: item.variantId,
    quantity: item.quantity,
  }));
  const json = await shopifyFetch(CREATE_CART_QUERY, { input: { lines } });
  return {
    cart: json.data?.cartCreate?.cart ?? null,
    userErrors: json.data?.cartCreate?.userErrors ?? [],
    errors: json.errors ?? [],
  };
}

export function shopifyIsConfigured() {
  return getConfig().configured;
}
