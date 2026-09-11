export type ThemeMode = "dark" | "light";
export type FontSet = "my-website" | "system" | "editorial" | "technical";
export type RadiusPreset = "sharp" | "compact" | "balanced" | "soft";
export type MotionPreset = "reduced" | "restrained" | "expressive";

export type AlchemyColor =
  | "obsidian"
  | "diamond"
  | "pearl"
  | "titanium"
  | "platinum"
  | "gold"
  | "silver"
  | "quicksilver"
  | "sapphire"
  | "ruby"
  | "emerald"
  | "amethyst"
  | "topaz";

export type TokenKey = string;

export type TokenDefinition = {
  key: TokenKey;
  label: string;
  defaultValue: AlchemyColor;
};

export type TokenGroup = {
  name: string;
  description: string;
  tokens: TokenDefinition[];
};

export const ALCHEMY_COLORS: AlchemyColor[] = [
  "obsidian",
  "diamond",
  "pearl",
  "titanium",
  "platinum",
  "gold",
  "silver",
  "quicksilver",
  "sapphire",
  "ruby",
  "emerald",
  "amethyst",
  "topaz",
];

export const TOKEN_HELP: Record<string, string> = {
  background: "The application canvas behind all content.",
  foreground: "Default readable text on the application canvas.",
  muted: "A quiet surface for grouped or secondary regions; never use it as text.",
  card: "Surface for elevated, contained content.",
  "card-foreground": "Text and icons placed directly on a card surface.",
  popover: "Surface for menus, tooltips, and transient overlays.",
  "popover-foreground": "Text and icons placed directly on a popover surface.",
  "muted-foreground": "Secondary readable text, descriptions, and supporting labels.",
  metadata: "Dates, provenance, bylines, identifiers, and compact informational details.",
  primary: "The main call-to-action and most important interactive emphasis.",
  "primary-foreground": "Text and icons placed on a filled primary element.",
  secondary: "A lower-priority filled action, including cancel and alternative actions.",
  "secondary-foreground": "Text and icons placed on a filled secondary element.",
  accent: "Hover, selection, or contextual emphasis—not a success-status color.",
  "accent-foreground": "Text and icons placed on a filled accent element.",
  destructive: "Irreversible or dangerous actions and error emphasis.",
  "destructive-foreground": "Text and icons placed on a filled destructive element.",
  link: "Inline navigational text links.",
  border: "Normal structural boundaries between related elements.",
  input: "The normal border of text fields and selects.",
  ring: "Keyboard-focus indicator; it must remain visible against every surface.",
  disabled: "Surface for disabled controls; it must not look interactive.",
  "disabled-foreground": "Text and icons on a disabled control.",
  overlay: "A translucent scrim behind dialogs, drawers, and other modal layers.",
  info: "Informational system feedback.",
  "info-foreground": "Text placed on a filled informational status element.",
  success: "Positive completion or healthy-status feedback.",
  "success-foreground": "Text placed on a filled success-status element.",
  warning: "Caution that needs attention but is not an error.",
  "warning-foreground": "Text placed on a filled warning-status element.",
  track: "The quiet track behind progress, rating, and loading indicators.",
  "chart-1": "First categorical chart series. It does not imply a rating or status.",
  "chart-2": "Second categorical chart series. It does not imply a rating or error.",
  "chart-3": "Third categorical chart series. It does not imply success.",
  "chart-4": "Fourth categorical chart series. It is independent from rating order.",
  "chart-5": "Fifth categorical chart series. It is independent from warning status.",
};

export const TOKEN_GROUPS: TokenGroup[] = [
  {
    name: "Surfaces",
    description: "The page, containers, and quiet areas.",
    tokens: [
      { key: "background", label: "Background", defaultValue: "diamond" },
      { key: "foreground", label: "Foreground", defaultValue: "silver" },
      { key: "muted", label: "Muted", defaultValue: "obsidian" },
      { key: "card", label: "Card", defaultValue: "pearl" },
      { key: "card-foreground", label: "Card text", defaultValue: "quicksilver" },
      { key: "popover", label: "Popover", defaultValue: "obsidian" },
      { key: "popover-foreground", label: "Popover text", defaultValue: "gold" },
    ],
  },
  {
    name: "Content",
    description: "Secondary text and compact informational details.",
    tokens: [
      { key: "muted-foreground", label: "Muted text", defaultValue: "platinum" },
      { key: "metadata", label: "Metadata", defaultValue: "topaz" },
    ],
  },
  {
    name: "Actions",
    description: "Calls to action, emphasis, and links.",
    tokens: [
      { key: "primary", label: "Primary", defaultValue: "sapphire" },
      { key: "primary-foreground", label: "Primary text", defaultValue: "diamond" },
      { key: "secondary", label: "Secondary", defaultValue: "amethyst" },
      { key: "secondary-foreground", label: "Secondary text", defaultValue: "diamond" },
      { key: "accent", label: "Accent", defaultValue: "emerald" },
      { key: "accent-foreground", label: "Accent text", defaultValue: "pearl" },
      { key: "destructive", label: "Destructive", defaultValue: "ruby" },
      { key: "destructive-foreground", label: "Destructive text", defaultValue: "quicksilver" },
      { key: "link", label: "Link", defaultValue: "gold" },
    ],
  },
  {
    name: "Architecture",
    description: "Borders, fields, focus, disabled states, overlays, and indicator tracks.",
    tokens: [
      { key: "border", label: "Border", defaultValue: "titanium" },
      { key: "input", label: "Input", defaultValue: "titanium" },
      { key: "ring", label: "Focus ring", defaultValue: "sapphire" },
      { key: "disabled", label: "Disabled", defaultValue: "obsidian" },
      { key: "disabled-foreground", label: "Disabled text", defaultValue: "platinum" },
      { key: "overlay", label: "Overlay", defaultValue: "obsidian" },
      { key: "track", label: "Indicator track", defaultValue: "obsidian" },
    ],
  },
  {
    name: "Status",
    description: "Explicit system feedback, separate from interaction accent.",
    tokens: [
      { key: "info", label: "Info", defaultValue: "sapphire" },
      { key: "info-foreground", label: "Info text", defaultValue: "diamond" },
      { key: "success", label: "Success", defaultValue: "emerald" },
      { key: "success-foreground", label: "Success text", defaultValue: "diamond" },
      { key: "warning", label: "Warning", defaultValue: "topaz" },
      { key: "warning-foreground", label: "Warning text", defaultValue: "diamond" },
    ],
  },
  {
    name: "Data",
    description: "Five independent chart series; rating colors use a separate invariant.",
    tokens: [
      { key: "chart-1", label: "Chart 1", defaultValue: "sapphire" },
      { key: "chart-2", label: "Chart 2", defaultValue: "ruby" },
      { key: "chart-3", label: "Chart 3", defaultValue: "emerald" },
      { key: "chart-4", label: "Chart 4", defaultValue: "amethyst" },
      { key: "chart-5", label: "Chart 5", defaultValue: "topaz" },
    ],
  },
];

export const DEFAULT_TOKENS = Object.fromEntries(
  TOKEN_GROUPS.flatMap((group) => group.tokens.map((token) => [token.key, token.defaultValue])),
) as Record<TokenKey, AlchemyColor>;

export const FONT_SETS: { value: FontSet; label: string; description: string }[] = [
  { value: "my-website", label: "My website", description: "Poppins display · Rubik body" },
  { value: "system", label: "System", description: "Native, fast, and neutral" },
  { value: "editorial", label: "Editorial", description: "Serif-led long-form reading" },
  { value: "technical", label: "Technical", description: "Compact product and data UI" },
];

export const RADIUS_PRESETS: { value: RadiusPreset; label: string }[] = [
  { value: "sharp", label: "Sharp" },
  { value: "compact", label: "Compact" },
  { value: "balanced", label: "Balanced" },
  { value: "soft", label: "Soft" },
];

export const MOTION_PRESETS: { value: MotionPreset; label: string }[] = [
  { value: "reduced", label: "Reduced" },
  { value: "restrained", label: "Restrained" },
  { value: "expressive", label: "Expressive" },
];
