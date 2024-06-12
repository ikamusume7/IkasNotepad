import type { UserConfig } from "vitepress";

import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";
import timeline from "vitepress-markdown-timeline";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import container from "markdown-it-container";
import { renderSandbox } from "vitepress-plugin-sandpack";
import { BiDirectionalLinks } from "@nolebase/markdown-it-bi-directional-links";

export const markdown: UserConfig["markdown"] = {
  lineNumbers: true,
  codeTransformers: [transformerTwoslash()],
  config(md) {
    // 其他 markdown-it 配置...
    // @ts-expect-error unmatched type for VitePress, ref https://github.com/nolebase/integrations/pull/228 [!code ++]
    md.use(InlineLinkPreviewElementTransform);
    md.use(timeline);
    md.use(tabsMarkdownPlugin);
    md
      // the second parameter is html tag name
      .use(container, "sandbox", {
        render(tokens, idx) {
          return renderSandbox(tokens, idx, "sandbox");
        },
      });
    md.use(BiDirectionalLinks({ dir: "pages" }));
  },
};
