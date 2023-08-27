import { Icons } from "@/components/icons"

const featureConfigs = [
    {
        features: [
            {
                name: 'Seamless SDK Integration',
                description: 'Embed into your App effortlessly with just 3 steps.',
                icon: Icons.chevronRight,
            },
            {
                name: 'Compatibility with Vercel AI SDK and Langchain',
                description: 'Ensure a smooth integration process with our adaptable SDKs.',
                icon: Icons.chevronRight,
            },
            {
                name: 'Comprehensive Documentation',
                description: 'Find all the information you need to integrate seamlessly in our user-friendly documentation.',
                icon: Icons.chevronRight,
            },
            // ... other features from firstFeature.tsx
        ],
        title: "Effortless Integration",
        subTitle: "Embed a feedback collection system with a few lines of code",
        imageUrl: "https://d2aaddunp29031.cloudfront.net/llm-feature-intg.png",
        imageAlt: "An illustration of the integration process",
        imageFirst: true
    },
    {
        features: [
            {
                name: 'Real-time Feedback on LLM Configurations',
                description: 'Monitor user feedback for every iteration of your LLM settings to ensure optimal performance.',
                icon: Icons.chevronRight,
            },
            {
                name: 'User Satisfaction Rate (CSAT) Tracking',
                description: 'Measure and analyze user satisfaction rates to continuously refine your AI model.',
                icon: Icons.chevronRight,
            },
        ],
        title: "Feedback Monitoring",
        subTitle: "Real-time tracking of user feedback for each model configuration",
        description: "Gain insights into user perceptions and improve your AI system's efficiency and effectiveness.",
        imageUrl: "https://d2aaddunp29031.cloudfront.net/feature-dashboard2.png",
        imageAlt: "A view of the feedback monitoring dashboard",
        imageFirst: false
    },
    {
        features: [
            {
                name: 'Real-time Answer Monitoring',
                description: 'Detect and flag unsatisfactory AI responses as they occur. (WIP)',
                icon: Icons.chevronRight,
            },
            {
                name: 'Insightful Feedback on Model Efficiency',
                description: 'Highlight potential weaknesses in your AI model configuration and knowledge base to ensure optimal performance.',
                icon: Icons.chevronRight,
            },
            {
                name: 'Identification of Uncovered Queries',
                description: 'Spot and log user questions that aren\'t addressed in your existing test cases to continuously enhance system comprehension.',
                icon: Icons.chevronRight,
            },
        ],
        title: "Outage Detection",
        subTitle: "Automatically identify and label subpar AI responses",
        description: "Ensure the quality and reliability of your AI system by monitoring and rectifying inaccuracies.",
        imageUrl: "https://d2aaddunp29031.cloudfront.net/outage-monitor.png",
        imageAlt: "A screenshot of the product interface",
        imageFirst: true
    }, 
    {
        features: [
            {
                name: 'Highlight Frequent User Queries',
                description: 'Identify the most common user queries, allowing you to prioritize and focus on key content.',
                icon: Icons.chevronRight,
            },
            {
                name: 'Labeling & Classification of User Queries',
                description: 'Efficiently categorize and label user queries for better data organization and analysis.',
                icon: Icons.chevronRight,
            },
            // ... other features from secondFeature.tsx
        ],
        title: "User Query Analysis",
        subTitle: "Deep Dive into User Interactions and Questions",
        description: "Enhance your understanding of user inquiries by analyzing frequency, patterns, and context.",
        imageUrl: "https://d2aaddunp29031.cloudfront.net/llm-feature2.png",
        imageAlt: "An illustration of user query analysis",
        imageFirst: false
    },
    {
        features: [
            {
                name: 'Comprehensive Feedback Review',
                description: 'Delve into each feedback with detailed contextual information for a holistic understanding.',
                icon: Icons.chevronRight,
            },
            {
                name: 'Insight into AI-User Interactions',
                description: 'Gain clarity on specific feedback by exploring the interactions between the AI and the user.',
                icon: Icons.chevronRight,
            },
            // ... other features from secondFeature.tsx
        ],
        title: "Feedback Insights",
        subTitle: "Analyze Feedback Within Its Context",
        description: "Deepen your understanding of user feedback by diving into the specific contexts and interactions that generated them.",
        imageUrl: "https://d2aaddunp29031.cloudfront.net/llm-feature2.png",
        imageAlt: "An illustration of feedback analysis",
        imageFirst: true
    }    
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
