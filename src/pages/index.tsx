import { GetStaticProps } from "next"
import { NextSeo } from "next-seo"

import { CategoryInfoType } from "@typing/category"
import { MetaType } from "@typing/post/meta"
import { PageType } from "@typing/page/type"

import { getMainCategoryInfo } from "@core/loader/category"
import { getLatestPostMeta } from "@core/loader/post"

import { config } from "blog.config"

export const getStaticProps: GetStaticProps<MainPageProps> = async () => {
    const latestPostMeta = await getLatestPostMeta()
    const mainCategoryInfo = await getMainCategoryInfo({
        useTXT: config.useTXT,
    })

    return {
        props: {
            latestPostMeta: latestPostMeta,
            mainCategoryInfo: mainCategoryInfo,
        },
    }
}

interface MainPageProps {
    latestPostMeta: MetaType[]
    mainCategoryInfo: CategoryInfoType[]
}

function MainPage({ latestPostMeta, mainCategoryInfo }: MainPageProps) {
    return (
        <>
            <NextSeo
                title={config.siteName}
                canonical={config.url}
                description={config.subtitle}
            />
        </>
    )
}
MainPage.displayName = "Home" as PageType

export default MainPage
