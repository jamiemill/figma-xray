import { FileData } from "./api";

import { lint as dslint } from "dslint";

//@ts-ignore
import { Rule as InFrameRule } from "dslint/dist/rules/must-be-in-frame";
//@ts-ignore
import { Rule as DuplicateComponentsRule } from "dslint/dist/rules/duplicate-component";
//@ts-ignore
import { Rule as A11yContrastRatioRule } from "dslint/dist/rules/a11y-contrast-ratio";
//@ts-ignore
//import { Rule as PreferLocalStyle } from "dslint/dist/rules/prefer-local-style";

export default function lint(fileData: FileData) {
  return dslint(fileData, [
    new InFrameRule(),
    new DuplicateComponentsRule(),
    new A11yContrastRatioRule(),
    //new PreferLocalStyle()
  ]);
}
