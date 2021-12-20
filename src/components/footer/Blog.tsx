import React from "react";
import {useTranslation} from "react-i18next";

const Blog: React.FC = () => {

  const {t} = useTranslation();

  return (
    <div className="flex flex-column px-4 pt-8 justify-center">
      <h3 className="font-semibold text-center text-blue">{t('blog.news')}</h3>
    </div>
  )
}

export default Blog;