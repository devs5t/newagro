import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

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

  console.log(posts)

  return (
    <div className="flex flex-column px-4 pt-8 justify-center">
      <h3 className="font-semibold text-center text-blue">{t('blog.news')}</h3>
    </div>
  )
}

export default Blog;