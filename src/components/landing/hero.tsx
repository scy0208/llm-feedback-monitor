"use client"
import Link from "next/link";
import Image from "next/image";
import { Grid } from "@radix-ui/themes"
import { siteConfig } from "@/config/site"
import { Icon } from '@iconify/react';

const title = {
    title: "Unlock the potential of your AI assistant",
    subtitle: "Get insights from user interaction, evolve your AI assistant with all the tools you need"
  };

export function Hero() {

    return (
        <section className="relative h-auto bg-cover bg-center pb-8 pt-16" style={{ backgroundImage: "url(" + "https://hkaift.com/wp-content/uploads/2023/03/iStock-11609956481-2048x1152.jpg" + ")" }}>
            {/* <!-- Gradient Overlay --> */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-sky-800 to-blue-700 opacity-75"></div>

            {/* <!-- Hero Content --> */}
            <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 h-screen">
                <div className="animate-fade-in-down mb-6 text-center text-white">
                    <h1 className="mb-4 text-5xl font-bold md:text-7xl">{title.title}</h1>
                    <p className="mb-6 text-2xl">
                        {title.subtitle}
                    </p>
                    <div className="flex justify-center items-center">
                    <Grid columns="3" gap="3">
                        <Link
                            href="/register"
                            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-slate-700 transition-colors duration-300 hover:bg-slate-200 hover:text-black"
                        >
                            Get Started
                        </Link>

                        {/* <Link
                            href={siteConfig.links.github}
                            className="inline-block rounded-lg bg-sky-800 border border-slate-400 flex justify-center pt-2 font-semibold text-white transition-colors duration-300 hover:bg-cyan-700 hover:text-white"
                            target="_blank">
                            <Icon icon="octicon:logo-github-16" color="white" width="75" height="32" />
                        </Link> */}

                        <Link
                            href={siteConfig.links.slack}
                            className="inline-block rounded-lg bg-sky-800 border border-slate-400 font-semibold text-white transition-colors duration-300 hover:bg-cyan-700 hover:text-white flex justify-center pt-2"
                            target="_blank">
                            <Icon icon="logos:slack" color="white" width="120"/>
                        </Link>
                        <Link
                            href={siteConfig.links.discord}
                            className="inline-block rounded-lg bg-sky-800 border border-slate-400 px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-cyan-700 hover:text-white"
                            target="_blank">
                            <Icon icon="logos:discord" color="white" width="120"/>
                        </Link>
                    </Grid>
                    </div>

                </div>

                {/* <!-- Product Screenshot --> */}
                <div className="mt-8 w-full rounded-lg md:w-2/3 shadow-lg">
                    {/* <Image src="https://webmobilefirst-screencasts.s3.eu-west-3.amazonaws.com/vs11Z6-7tQ.gif" width={1000} height={1000} alt="Product Screenshot" className="shadow-lg rounded-lg"/> */}
                    {/* <video
                            ref={videoRef}
                            width="300"
                            loop
                            muted
                            style={{
                                position: "relative",
                                width: "100%",
                                left: 0,
                                top: 0,
                              }}>
                            <source src="https://d2aaddunp29031.cloudfront.net/hero-new.mp4" type="video/mp4"/>
                    </video> */}

                </div>
            </div>
        </section>
    )
}