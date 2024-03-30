import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

type Feature = {
    title : string,
    desc : string,
    child : JSX.Element
}

function FeatureCard({title, desc, child} : Feature) {
  return (
    <Card className='max-w-sm mx-auto'>
        <CardHeader className='flex flex-col items-start'>
        <div className='bg-secondary p-3 rounded-full mb-2'>
            {child}
        </div>
        <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
        <p className='text-sm text-muted-foreground'>
            {desc}
        </p>
        </CardContent>
    </Card>
  )
}

export default FeatureCard