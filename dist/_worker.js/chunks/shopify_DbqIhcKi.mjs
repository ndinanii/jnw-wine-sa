globalThis.process ??= {}; globalThis.process.env ??= {};
const API_VERSION = "2026-01";
const DEFAULT_EDGE_CACHE_TTL_SECONDS = 90;
const DEFAULT_EDGE_STALE_TTL_SECONDS = 300;
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
                selectedOptions {
                  name
                  value
                }
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
            selectedOptions {
              name
              value
            }
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
function parsePositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
function parseNonNegativeInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}
function splitTokenList(rawValue) {
  if (!rawValue) return [];
  return String(rawValue).split(",").map((token) => token.trim()).filter(Boolean);
}
function getEdgeCacheConfig() {
  return {
    ttl: parsePositiveInt(
      undefined                                                 ,
      DEFAULT_EDGE_CACHE_TTL_SECONDS
    ),
    staleTtl: parsePositiveInt(
      undefined                                                       ,
      DEFAULT_EDGE_STALE_TTL_SECONDS
    )
  };
}
function getEdgeCacheStorage() {
  return typeof caches !== "undefined" && caches?.default ? caches.default : null;
}
function isReadOperation(query) {
  return !/^\s*mutation\b/i.test(query || "");
}
async function sha256Hex(input) {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, "0")).join("");
}
async function createEdgeCacheKey(domain, query, variables) {
  const hash = await sha256Hex(
    JSON.stringify({
      domain,
      apiVersion: API_VERSION,
      query,
      variables
    })
  );
  return new Request(`https://${domain}/__shopify_storefront_cache__/${hash}`, {
    method: "GET"
  });
}
function getConfig() {
  const rawDomain = "jnw-wine-2.myshopify.com";
  const domain = rawDomain.replace(/^https?:\/\//, "").replace(/\/+$/, "") ;
  const tokens = [
    ...splitTokenList("r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"),
    ...splitTokenList(undefined                                                        ),
    ...splitTokenList("ec10fea9b0dd447944eb03934138c792")
  ];
  const configured = Boolean(domain && tokens.length);
  return { domain, tokens, configured };
}
async function readEdgeCache(cacheStorage, cacheKey) {
  if (!cacheStorage || !cacheKey) return null;
  const cachedResponse = await cacheStorage.match(cacheKey);
  if (!cachedResponse) return null;
  try {
    return await cachedResponse.json();
  } catch {
    return null;
  }
}
async function writeEdgeCache(cacheStorage, cacheKey, payload, ttl, staleTtl) {
  if (!cacheStorage || !cacheKey || !payload || payload.errors?.length) return;
  const cacheHeaders = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": `public, max-age=0, s-maxage=${ttl}, stale-while-revalidate=${staleTtl}`
  });
  const response = new Response(JSON.stringify(payload), {
    status: 200,
    headers: cacheHeaders
  });
  await cacheStorage.put(cacheKey, response);
}
async function shopifyFetch(query, variables = {}, options = {}) {
  const { domain, tokens, configured } = getConfig();
  if (!configured) {
    return { data: null, errors: [{ message: "Shopify configuration missing." }] };
  }
  const edgeCacheConfig = getEdgeCacheConfig();
  const effectiveTtl = parseNonNegativeInt(options.edgeCacheTtl, edgeCacheConfig.ttl);
  const effectiveStaleTtl = parseNonNegativeInt(options.edgeCacheStaleTtl, edgeCacheConfig.staleTtl);
  const allowEdgeCache = isReadOperation(query) && effectiveTtl > 0;
  const cacheStorage = allowEdgeCache ? getEdgeCacheStorage() : null;
  let cacheKey = null;
  if (cacheStorage) {
    try {
      cacheKey = await createEdgeCacheKey(domain, query, variables);
      const cachedPayload = await readEdgeCache(cacheStorage, cacheKey);
      if (cachedPayload) return cachedPayload;
    } catch {
      cacheKey = null;
    }
  }
  let latestAuthFailureStatus = 0;
  for (let tokenIndex = 0; tokenIndex < tokens.length; tokenIndex += 1) {
    const token = tokens[tokenIndex];
    let response;
    try {
      response = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": token
        },
        body: JSON.stringify({ query, variables })
      });
    } catch (error) {
      return { data: null, errors: [{ message: `Shopify request failed: ${error.message}` }] };
    }
    if (response.status === 401 || response.status === 403) {
      latestAuthFailureStatus = response.status;
      continue;
    }
    if (!response.ok) {
      return { data: null, errors: [{ message: `Shopify API failed (${response.status}).` }] };
    }
    const payload = await response.json();
    if (cacheStorage && cacheKey) {
      try {
        await writeEdgeCache(cacheStorage, cacheKey, payload, effectiveTtl, effectiveStaleTtl);
      } catch {
      }
    }
    return payload;
  }
  if (latestAuthFailureStatus) {
    return {
      data: null,
      errors: [
        {
          message: `Shopify token rejected (${latestAuthFailureStatus}). Check token scope or rotation config.`
        }
      ]
    };
  }
  return { data: null, errors: [{ message: "Shopify request failed before response." }] };
}
async function getProducts(first = 24) {
  const json = await shopifyFetch(GET_PRODUCTS_QUERY, { first });
  return json.data?.products?.edges?.map((edge) => edge.node) ?? [];
}
async function getProductByHandle(handle) {
  const json = await shopifyFetch(GET_PRODUCT_BY_HANDLE_QUERY, { handle });
  return json.data?.product ?? null;
}
async function createCartCheckout(lineItems) {
  const lines = lineItems.map((item) => ({
    merchandiseId: item.variantId,
    quantity: item.quantity
  }));
  const json = await shopifyFetch(CREATE_CART_QUERY, { input: { lines } }, { edgeCacheTtl: 0 });
  return {
    cart: json.data?.cartCreate?.cart ?? null,
    userErrors: json.data?.cartCreate?.userErrors ?? [],
    errors: json.errors ?? []
  };
}
function shopifyIsConfigured() {
  return getConfig().configured;
}

export { getProducts as a, createCartCheckout as c, getProductByHandle as g, shopifyIsConfigured as s };
