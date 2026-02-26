const YEAR_PATTERN = /\b(?:19|20)\d{2}\b/;
const DEFAULT_TITLE_PATTERN = /^default title$/i;

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function extractYear(value) {
  const text = cleanText(value);
  if (!text) return "";
  const match = text.match(YEAR_PATTERN);
  return match ? match[0] : "";
}

function normalizeOptionName(name) {
  return cleanText(name).toLowerCase();
}

export function getVariantNodes(product) {
  return product?.variants?.edges?.map((edge) => edge?.node).filter(Boolean) ?? [];
}

export function getSelectedOptionValue(variant, optionNames = []) {
  const selectedOptions = Array.isArray(variant?.selectedOptions) ? variant.selectedOptions : [];
  if (!selectedOptions.length) return "";

  const normalizedTargets = optionNames.map(normalizeOptionName);
  const option = selectedOptions.find((entry) => normalizedTargets.includes(normalizeOptionName(entry?.name)));
  return cleanText(option?.value);
}

export function getVariantVintage(variant) {
  const explicit = getSelectedOptionValue(variant, ["vintage", "year", "harvest"]);
  if (explicit) return explicit;

  const fromTitle = extractYear(variant?.title);
  if (fromTitle) return fromTitle;

  return extractYear(variant?.sku);
}

export function getVariantSize(variant) {
  const explicit = getSelectedOptionValue(variant, ["size", "format", "bottle size"]);
  if (explicit) return explicit;

  const title = cleanText(variant?.title);
  if (!title || DEFAULT_TITLE_PATTERN.test(title)) return "";

  const parts = title.split("/").map((part) => part.trim()).filter(Boolean);
  return parts.length > 1 ? parts[1] : "";
}

export function getProductVintages(product) {
  const vintages = getVariantNodes(product).map(getVariantVintage).filter(Boolean);
  const unique = [...new Set(vintages)];
  return unique.sort((left, right) => {
    const leftYear = Number.parseInt(left, 10);
    const rightYear = Number.parseInt(right, 10);
    const bothNumeric = Number.isFinite(leftYear) && Number.isFinite(rightYear);
    if (bothNumeric) return leftYear - rightYear;
    return left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" });
  });
}

export function formatProductVintageText(product) {
  const vintages = getProductVintages(product);
  if (!vintages.length) return "";
  if (vintages.length === 1) return `Vintage: ${vintages[0]}`;
  return `Vintages: ${vintages.join(", ")}`;
}

export function formatVariantLabel(variant) {
  const vintage = getVariantVintage(variant);
  const size = getVariantSize(variant);
  if (vintage && size) return `${vintage} / ${size}`;
  if (vintage) return `Vintage ${vintage}`;
  if (size) return size;

  const title = cleanText(variant?.title);
  if (!title || DEFAULT_TITLE_PATTERN.test(title)) return "Standard";
  return title;
}

export function pickDefaultVariant(product) {
  const variants = getVariantNodes(product);
  if (!variants.length) return null;

  const availableVariants = variants.filter((variant) => variant?.availableForSale);
  const pool = availableVariants.length ? availableVariants : variants;

  const bottlePreferred = pool.find((variant) => {
    const text = `${cleanText(getVariantSize(variant))} ${cleanText(variant?.title)}`.toLowerCase();
    return /750\s*ml|bottle/.test(text);
  });
  if (bottlePreferred) return bottlePreferred;

  const latestVintage = pool
    .map((variant) => ({
      variant,
      year: Number.parseInt(getVariantVintage(variant), 10),
    }))
    .filter((entry) => Number.isFinite(entry.year))
    .sort((left, right) => right.year - left.year)[0];
  if (latestVintage?.variant) return latestVintage.variant;

  return pool[0];
}
