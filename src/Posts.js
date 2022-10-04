import rawContent from "./assets/raw_content.json"

// getPost pulls the post content from the raw_content.json by the post id.
export const getPost = (postId) => {
    // Here we can access assets/raw_content.json to inject the item sections into the project page as a prop  
  
    const modalProps = {
        heading: rawContent[postId].name,
        sections: [
          {
            heading: "Readme.md",
            syntax: "markdown",
            content: rawContent[postId].raw,
          },
          {
            heading: "other",
            syntax: "default",
            content: "text"
          }
        ],
      }
    
    console.log("modalProps", modalProps)
    return modalProps
  }