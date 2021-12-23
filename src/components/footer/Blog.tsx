import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import moment from "moment";
import {Tooltip} from "@mui/material";

type Post = {
  name: string;
  author: string;
  categories: string[];
  content: string
  description: string;
  link: string
  pubDate: Date;
  thumbnail: string
  title: string;
};

const API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@barbecueswap';
const BLOG_URL = "https://barbecueswap.medium.com/";
const POSTS_AMOUNT = 3;

const Blog: React.FC = () => {

  const {t} = useTranslation();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(res => setPosts(res.items.slice(0, POSTS_AMOUNT)))
      .catch(console.error);
  }, []);

  const descriptionToText = (node: string) => {
    const tag = document.createElement("div");
    tag.innerHTML = node;
    node = tag.innerText;
    return node;
  };

  return (
    <div className="flex flex-col px-10 md:px-6 py-8 md:pb-0 justify-center max-w-lg	items-center mx-auto">
      <h3 className="font-semibold text-center text-blue mb-4">{t('blog.news')}</h3>

      {posts.map((post, key) => (
        <div className="flex w-full flex-col mb-2" key={key}>
          <Tooltip title={post.title} placement="top">
            <a
              href={post.link}
              target="_blank"
              className="pointer text-blue underline truncate mb-2"
              rel="noreferrer"
            >
              {post.title}
            </a>
          </Tooltip>

          <p className="text-tiny text-blue mb-1">{`${descriptionToText(post.description.substring(0, 300))}...`}</p>

          <p className="text-tiny text-gray">{moment(post.pubDate).format("MMM DD, YYYY")}</p>
        </div>
      ))}

      <a
        href={BLOG_URL}
        target="_blank"
        className="pointer text-green underline truncate text-center my-6 uppercase font-bold"
        rel="noreferrer"
      >
        {t('blog.go_to')}
      </a>
    </div>
  )
}

export default Blog;