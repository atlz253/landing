export default {
  extends: ["stylelint-config-standard", "stylelint-config-html/astro"],
  rules: {
    "no-empty-source": null,
    "selector-class-pattern": "^[a-z][a-zA-Z0-9_-]*$",
    "color-function-notation": null,
    "color-function-alias-notation": null,
    "alpha-value-notation": null,
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global"] },
    ],
  },
};
