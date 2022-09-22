import { createElement, Fragment, useEffect, useState } from "react";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";

function HTML2down({ Content, setContent }) {
  useEffect(() => {
    unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeReact, { createElement, Fragment })
      .process(Content)
      .then((file) => {
        setContent(file.result);
      });
  }, [Content, setContent]);

  return Content;
}

export default HTML2down;
