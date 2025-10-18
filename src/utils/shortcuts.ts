export type RawShortcut = string | string[];

export type ParsedShortcutToken = {
  raw: string;
  key: string;
  label: string;
  modifier: boolean;
};

const SHORTCUT_ALIASES: Record<string, ParsedShortcutToken> = {
  cmd: { raw: "cmd", key: "meta", label: "⌘", modifier: true },
  command: { raw: "command", key: "meta", label: "⌘", modifier: true },
  "⌘": { raw: "⌘", key: "meta", label: "⌘", modifier: true },
  meta: { raw: "meta", key: "meta", label: "⌘", modifier: true },
  ctrl: { raw: "ctrl", key: "control", label: "Ctrl", modifier: true },
  control: { raw: "control", key: "control", label: "Ctrl", modifier: true },
  "⌃": { raw: "⌃", key: "control", label: "Ctrl", modifier: true },
  alt: { raw: "alt", key: "alt", label: "Alt", modifier: true },
  option: { raw: "option", key: "alt", label: "⌥", modifier: true },
  "⌥": { raw: "⌥", key: "alt", label: "⌥", modifier: true },
  shift: { raw: "shift", key: "shift", label: "⇧", modifier: true },
  "⇧": { raw: "⇧", key: "shift", label: "⇧", modifier: true },
  enter: { raw: "enter", key: "enter", label: "↵", modifier: false },
  return: { raw: "return", key: "enter", label: "↵", modifier: false },
  "↵": { raw: "↵", key: "enter", label: "↵", modifier: false },
  esc: { raw: "esc", key: "escape", label: "esc", modifier: false },
  escape: { raw: "escape", key: "escape", label: "esc", modifier: false },
  "⌫": { raw: "⌫", key: "backspace", label: "⌫", modifier: false },
  backspace: { raw: "backspace", key: "backspace", label: "⌫", modifier: false },
  space: { raw: "space", key: " ", label: "Space", modifier: false },
  tab: { raw: "tab", key: "tab", label: "Tab", modifier: false },
  up: { raw: "up", key: "arrowup", label: "↑", modifier: false },
  "arrow-up": { raw: "arrow-up", key: "arrowup", label: "↑", modifier: false },
  arrowup: { raw: "arrowup", key: "arrowup", label: "↑", modifier: false },
  down: { raw: "down", key: "arrowdown", label: "↓", modifier: false },
  "arrow-down": { raw: "arrow-down", key: "arrowdown", label: "↓", modifier: false },
  arrowdown: { raw: "arrowdown", key: "arrowdown", label: "↓", modifier: false },
  left: { raw: "left", key: "arrowleft", label: "←", modifier: false },
  arrowleft: { raw: "arrowleft", key: "arrowleft", label: "←", modifier: false },
  right: { raw: "right", key: "arrowright", label: "→", modifier: false },
  arrowright: { raw: "arrowright", key: "arrowright", label: "→", modifier: false },
};

const MODIFIER_KEYS = new Set(["meta", "control", "alt", "shift"]);

export const tokenizeShortcut = (value: RawShortcut | undefined): ParsedShortcutToken[] => {
  if (!value) return [];

  const tokens = Array.isArray(value)
    ? value
    : value
        .split("+")
        .map((token) => token.trim())
        .filter(Boolean);

  return tokens.map((token) => {
    const normalized = token.toLowerCase();
    const alias = SHORTCUT_ALIASES[normalized];
    if (alias) {
      return { ...alias, raw: token };
    }

    const isSingleChar = token.length === 1;
    const key = isSingleChar ? token.toLowerCase() : normalized;
    const label = isSingleChar ? token.toUpperCase() : token;
    const modifier = MODIFIER_KEYS.has(key);

    return {
      raw: token,
      key,
      label,
      modifier,
    };
  });
};

export const toAriaShortcut = (tokens: ParsedShortcutToken[]): string | null => {
  if (!tokens.length) return null;

  const parts = tokens.map((token) => {
    if (token.modifier) {
      switch (token.key) {
        case "meta":
          return "Meta";
        case "control":
          return "Control";
        case "alt":
          return "Alt";
        case "shift":
          return "Shift";
        default:
          return token.label;
      }
    }

    return token.label.length === 1 ? token.label.toUpperCase() : token.label;
  });

  return parts.join("+");
};

export const splitModifiers = (tokens: ParsedShortcutToken[]) => {
  const modifiers = tokens.filter((token) => token.modifier).map((token) => token.key);
  const primary = tokens.find((token) => !token.modifier)?.key ?? null;

  return { modifiers, primary };
};
