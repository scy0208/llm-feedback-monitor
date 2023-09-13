import { Icons } from "@/components/icons"

const featureConfigs = [

    {
        "features": [
            {
                "name": "Unified Logging",
                "description": "Versionize and log your LLM change in one API call",
                "icon": Icons.chevronRight
            },
            {
                "name": "Metrics Categorization",
                "description": "Categorize all metrics to each version of LLM",
                "icon": Icons.chevronRight
            }
        ],
        "title": "Development Stage",
        "subTitle": "Versionize every iteration of your LLM setting",
        "description": "Ensure full traceability and transparency with every change in your LLM setting. Tracking, measuring, and analyzing every tweak seamlessly.",
        "imageUrl": "https://d2aaddunp29031.cloudfront.net/llm-config-version.png",
        "imageAlt": "A view of the versionize dashboard",
        "imageFirst": false
    },
    {
        features: [
            {
                name: 'Unified Feedback API',
                description: 'Easily integrate this API into your products, client portals, or internal dashboards, allowing stakeholders to evaluate your content from diverse angles.',
                icon: Icons.chevronRight,
            },
            {
                name: 'Multi-Level Feedback Analytics',
                description: 'Utilize feedback data across various layers, deriving unique insights from internal teams, clients, or end-users; real-time CSAT tracking, and data labeling for iterative product development.',
                icon: Icons.chevronRight,
            }
        ],
        title: "Evaluation Phase",
        subTitle: "Seamless Feedback API Integration",
        description: "Incorporate feedback or manual tagging features for internal evaluation teams, client partners, or end-users through a single API call.",
        imageUrl: "https://d2aaddunp29031.cloudfront.net/feature_feedback-ui_1.png",
        imageAlt: "Feedback UI Overview",
        imageFirst: true
    }
    // {
    //     features: [
    //         {
    //             name: 'Real-time Answer Monitoring',
    //             description: 'Detect and flag unsatisfactory AI responses to track Fallback Rate',
    //             icon: Icons.chevronRight,
    //         },
    //         {
    //             name: 'Identification of Uncovered Queries',
    //             description: 'Spot and log user instructions that aren\'t addressed in your existing test cases to continuously enhance system comprehension.',
    //             icon: Icons.chevronRight,
    //         },
    //         {
    //             name: 'Insightful Feedback on Model Efficiency',
    //             description: 'Highlight potential weaknesses in your AI model configuration and knowledge base to ensure optimal performance.',
    //             icon: Icons.chevronRight,
    //         },
    //     ],
    //     title: "Defect Detection",
    //     subTitle: "Identify bad AI responses",
    //     description: "Ensure the quality and reliability of your AI system by monitoring and rectifying inaccuracies.",
    //     imageUrl: "https://d2aaddunp29031.cloudfront.net/outage-monitor.png",
    //     imageAlt: "A screenshot of the product interface",
    //     imageFirst: true
    // }, 
    // {
    //     "features": [
    //         {
    //             "name": "Goal Completion Tracker",
    //             "description": "Sentiment Analysis on each conversation to track Goal completion",
    //             "icon": "Icons.chevronRight"
    //         },
    //         {
    //             "name": "Emotion Detection",
    //             "description": "Identify and categorize the emotions present in each conversation for deeper insights.",
    //             "icon": "Icons.chevronRight"
    //         }
    //     ],
    //     "title": "Sentiment Analysis",
    //     "subTitle": "Real-time Conversation Sentiment Analysis",
    //     "description": "Harness the power of AI to analyze sentiments in real-time. Understand your audience's emotions and gain actionable insights from every conversation.",
    //     "imageUrl": "https://d2aaddunp29031.cloudfront.net/feature-dashboard2.png",
    //     "imageAlt": "A view of the Sentiment Analysis dashboard",
    //     "imageFirst": false
    // },
    // {
    //     "features": [
    //         {
    //             "name": "JS and Python SDK",
    //             "description": "Seamless integration into your projects with dedicated SDKs for JavaScript and Python.",
    //             "icon": "Icons.chevronRight"
    //         },
    //         {
    //             "name": "Vercel AI, Langchain and LamaIndex supporting",
    //             "description": "Direct compatibility with leading AI frameworks like Vercel AI, Langchain, and LamaIndex to streamline your development.",
    //             "icon": "Icons.chevronRight"
    //         }
    //     ],
    //     "title": "Developer Friendly",
    //     "subTitle": "Easily integrated with top AI frameworks",
    //     "description": "Our suite offers out-of-the-box integration with major development platforms, ensuring you dive into a frictionless development experience.",
    //     "imageUrl": "https://d2aaddunp29031.cloudfront.net/llm-feature-intg.png",
    //     "imageAlt": "A view of the developer integration dashboard",
    //     "imageFirst": true
    // }
    
];

export function Features() {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32" id="features">
            {featureConfigs.map((config, index) => (
                <div key={index} className="mx-auto max-w-7xl px-6 lg:px-8 mt-20">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className={`lg:${index === 0 ? "ml-auto pl-4 pt-4" : "pr-8 pt-4"}`}>
                            <div className="lg:max-w-lg">
                                <h2 className="text-base font-semibold leading-7 text-indigo-600">{config.title}</h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{config.subTitle}</p>
                                <p className="mt-6 text-lg leading-8 text-gray-600">{config.description}</p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                    {config.features.map((feature) => (
                                        <div key={feature.name} className="relative pl-9">
                                            <dt className="inline font-semibold text-gray-900">
                                                <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                                {feature.name}
                                            </dt>{' '}
                                            <dd className="inline">{feature.description}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <div className={`flex ${config.imageFirst ? "lg:order-first items-start justify-end" : "items-end justify-start"}`}>
                            <img
                                src={config.imageUrl}
                                alt={config.imageAlt}
                                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                                width={2432}
                                height={1442}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
