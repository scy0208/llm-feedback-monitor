import { Icons } from "@/components/icons"

const featureConfigs = [
    {
        features: [
            {
                name: '',
                description: 'Using our SDK, integrate into App in 3 steps',
                icon: Icons.chevronRight,
            },
            {
                name: '',
                description: 'integrate easily with Vercel AI SDK and Langchain',
                icon: Icons.chevronRight,
            },
            {
                name: '',
                description: 'More details in our documentation',
                icon: Icons.chevronRight,
            },
            // ... other features from firstFeature.tsx
        ],
        title: "Easy Integrate",
        subTitle: "Simply Add Feedback by API",
        imageUrl: "https://d2aaddunp29031.cloudfront.net/llm-feature-intg.png",
        imageAlt: "Product screenshot",
        imageFirst: true
    },
    {
        features: [
            {
                name: '',
                description:
                    'Monitoring the user feedback score changing of each version of your LLM config',
                icon: Icons.chevronRight,
            },
            // ... other features from secondFeature.tsx
        ],
        title: "Feedback Monitoring",
        subTitle: "Monitor LLM Prompt and Model",
        description: "",
        imageUrl: "https://d2aaddunp29031.cloudfront.net/llm-feature1.png",
        imageAlt: "Product screenshot",
        imageFirst: false
    },
    {
        features: [
            {
                name: '',
                description:
                    'Monitoring the user feedback score changing of each version of your LLM config',
                icon: Icons.chevronRight,
            },
            // ... other features from secondFeature.tsx
        ],
        title: "Understand Feedback",
        subTitle: "Feedback Analyze with Context",
        description: "",
        imageUrl: "https://d2aaddunp29031.cloudfront.net/llm-feature2.png",
        imageAlt: "Product screenshot",
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
