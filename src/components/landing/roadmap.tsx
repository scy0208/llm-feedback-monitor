import { Icons } from '@/components/icons'

interface Feature {
    name: string;
    description: string;
    icon: keyof typeof Icons;
}


const features: Feature[] = [
    {
        name: 'Feedback UI Kit',
        description: 'Easily integrate a feedback UI component into your application with our SDK.',
        icon: "blocks"
    },
    {
        name: 'Langchain JS Integration',
        description: 'Seamlessly connect your backend with the Langchain framework.',
        icon: "unplug"
    },
    {
        name: 'Python SDK Support',
        description: 'Enhance your Python applications with our dedicated Python SDK integration.',
        icon: "copyPlus"
    },
    {
        name: 'Curated Testing Datasets',
        description: 'Building production-verified, user-labeled datasets for testing, continuous integration, deployment, and model fine-tuning.',
        icon: "testTubes"
    }  
]

export function Roadmap() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">We need your advice</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Future Roadmap</p>
                        <p className="mt-6 text-base leading-7 text-gray-600">
                            This project is at really early stage, our goal is to provide a easist integrated system with deepest analytics ability. We need your ideas and advices
                        </p>
                    </div>
                    <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => {
                            const Icon = Icons[feature.icon || "arrowRight"]
                            return (
                                <div key={feature.name} className="relative pl-9">
                                    <dt className="font-semibold text-gray-900">
                                        <Icon className="absolute left-0 top-1 h-5 w-5 text-indigo-500" aria-hidden="true" />
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2">{feature.description}</dd>
                                </div>
                            )
                        }
                        )}
                    </dl>
                </div>
            </div>
        </div>
    )
}
