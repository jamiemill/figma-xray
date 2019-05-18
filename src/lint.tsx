import { FileData } from "./api";

import { lint as dslint } from "dslint";

import { Rule as InFrameRule } from "dslint/dist/rules/must-be-in-frame";
import { Rule as DuplicateComponentsRule } from "dslint/dist/rules/duplicate-component";
import { Rule as A11yContrastRatioRule } from "dslint/dist/rules/a11y-contrast-ratio";
import { Rule as PreferLocalStyle } from "dslint/dist/rules/prefer-local-style";

export default async function lint(fileData: FileData) {
  const rulesCtors = [
    InFrameRule,
    DuplicateComponentsRule,
    A11yContrastRatioRule,
    PreferLocalStyle
  ];
  const rules = await Promise.all(
    rulesCtors.map(async r => {
      const ruleInstance = new r();
      if (typeof ruleInstance.ruleDidLoad === 'function') {
        await ruleInstance.ruleDidLoad(fileData, undefined, undefined);
      }
      return ruleInstance;
    })
  );
  
  return dslint(fileData, rules);
}
