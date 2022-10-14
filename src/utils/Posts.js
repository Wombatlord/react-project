import rawContent from "../assets/raw_content.json"

// getPost pulls the post content from the raw_content.json by the post id.
export const getPost = (postId) => {
  // Here we can access assets/raw_content.json to inject the item sections into the project page as a prop  

  const modalPropsNoGallery = {
    heading: rawContent[postId].name,
    sections: [
      {
        heading: "Readme.md",
        syntax: "markdown",
        content: rawContent[postId].raw,
      },
    ],
  }

  const modalPropsWithGallery = {
    heading: rawContent[postId].name,
    sections: [
      {
        heading: "Readme.md",
        syntax: "markdown",
        content: rawContent[postId].raw,
      },
      {
        heading: "Gallery",
        syntax: "image",
        content: rawContent[postId].images,
      }
    ],
  }


  console.log("modalProps", modalPropsWithGallery)

  return (rawContent[postId].images.length ? modalPropsWithGallery : modalPropsNoGallery)
}
