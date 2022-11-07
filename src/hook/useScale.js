export default function useScale() {
  const scale = (content) => {
    let viewport = document.querySelector("meta[name=viewport]");
    if (!viewport) {
      // in case there is no view port meta tag creates one and add it to the head
      viewport = document.createElement("meta");
      viewport.name = "viewport";
      document.getElementsByTagName("head")[0].appendChild(viewport);
    }
    viewport.setAttribute("content", content);
  };

  const onScale = ({
    width = 1500,
    maximumScale = 5,
    userScaleable = true,
    shrinkToFit = true,
  } = {}) => {
    const content = `width=${width}, maximum-scale=${maximumScale}, user-scalable=${
      userScaleable ? "yes" : "no"
    }, shrink-to-fit=${shrinkToFit ? "yes" : "no"}`;
    scale(content);
  };
  const onUnscale = () => {
    const content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=yes";
    scale(content);
  };
  return { onScale, onUnscale };
}
