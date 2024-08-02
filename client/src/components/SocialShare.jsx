import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  PinterestShareButton,
  PinterestIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

const SocialShare = ({ url, title, media }) => {
  return (
    <div className="flex gap-4  flex-wrap mt-4 md:mt-0">
      <RedditShareButton
        url={url}
        title={title}
        className="transition-transform transform hover:scale-110"
      >
        <RedditIcon size={32} round />
      </RedditShareButton>
      <PinterestShareButton
        url={url}
        media={media}
        className="transition-transform transform hover:scale-110"
      >
        <PinterestIcon size={32} round />
      </PinterestShareButton>
      <TwitterShareButton
        url={url}
        title={title}
        className="transition-transform transform hover:scale-110"
      >
        <XIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton
        url={url}
        title={title}
        summary={title}
        className="transition-transform transform hover:scale-110"
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <FacebookShareButton
        url={url}
        quote={title}
        className="transition-transform transform hover:scale-110"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TelegramShareButton
        url={url}
        title={title}
        className="transition-transform transform hover:scale-110"
      >
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <WhatsappShareButton
        url={url}
        title={title}
        className="transition-transform transform hover:scale-110"
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
};

export default SocialShare;
