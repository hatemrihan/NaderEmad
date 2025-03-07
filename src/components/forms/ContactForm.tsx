import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Button from '../Button'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const joinFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(8, 'Invalid phone number'),
    Program: z.string().min(1, 'Please select a program'),
    Subscription: z.string().min(1, 'Please select a subscription')
})

const supportFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(8, 'Invalid phone number'),
    message: z.string().min(10, 'Message must be at least 10 characters')
})

const ContactForm = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState('sales');
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, []);

    async function handleJoinSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "cf036439-fe84-4ef2-a54d-8cd90cc73a71",
                    ...Object.fromEntries(formData)
                }),
            });
            const result = await response.json();
            if (result.success) {
                router.push('/submit');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    async function handleSupportSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "cf036439-fe84-4ef2-a54d-8cd90cc73a71",
                    ...Object.fromEntries(formData)
                }),
            });
            const result = await response.json();
            if (result.success) {
                router.push('/submit');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    return (
        <section className='min-h-screen w-screen flex flex-col items-center justify-center px-5 bg-stone-900'>
            <h1 className='text-2xl font-bold mb-7 text-center text-white'>Join Our Ramadan Challenge!</h1>
            <div className='w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
                {/* Form Section - Left Side */}
                <Card className='w-full bg-stone-900'>
                    <Tabs defaultValue='sales' onValueChange={setActiveTab}>
                        <CardContent className='mt-5 bg-stone-900'>
                            <TabsList className='grid grid-cols-2 bg-stone-700'>
                                <TabsTrigger value='sales' className='text-black'>
                                    Join Now
                                </TabsTrigger>
                                <TabsTrigger value='Support' className='text-black'>
                                    Business
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value='sales'>
                                <p className='text-muted-foreground text-sm text-center'>Get Your Appointment Now</p>
                                <form onSubmit={handleJoinSubmit} className='flex flex-col mt-5 gap-y-4'>
                                    <input type="hidden" name="_gotcha" />
                                    <div className='grid space-y-1'>
                                        <Label className='text-white'>Name</Label>
                                        <Input className='bg-stone-900 text-white' name='name' placeholder='Hatem Rihan' required />
                                    </div>
                                    <div className='grid space-y-1'>
                                        <Label className='text-white'>Email</Label>
                                        <Input className='bg-stone-900 text-white' name='email' placeholder='NaderEmad@example.com' required />
                                    </div>
                                    <div className='grid space-y-1'>
                                        <Label className='text-white'>Phone Number</Label>
                                        <Input className='bg-stone-900 text-white' name='phone' placeholder='+20 1234567899' required />
                                    </div>
                                    <div className='grid space-y-3 text-stone-500'>
                                        <Label className='text-white'>Program</Label>
                                        <Select name='Program' required>
                                            <SelectTrigger className="w-[180px] bg-stone-900 text-white">
                                                <SelectValue className='text-stone-700' placeholder="Select a Program"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel >Program</SelectLabel>
                                                    <SelectItem value="pt on Ground">Pt On Ground</SelectItem>
                                                    <SelectItem value="elementfive">Pt online</SelectItem>
                                                    <SelectItem value="Online">Nutrition Plan</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Label className='text-white'>Subscription</Label>
                                        <Select name='Subscription' required>
                                            <SelectTrigger className="w-[180px bg-stone-900 text-white">
                                                <SelectValue placeholder="Select a Subscription"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Subscription</SelectLabel>
                                                    <SelectItem value="1 month">1 month</SelectItem>
                                                    <SelectItem value="3 months">3 months</SelectItem>
                                                    <SelectItem value="6 months">6 months</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button className='flex items-center justify-center text-white' type='submit'>Submit</Button>
                                </form>
                            </TabsContent>
                            <TabsContent value='Support'>
                                <p className='text-muted-foreground text-sm text-center'>Talk to our Support</p>
                                <form onSubmit={handleSupportSubmit} className='flex flex-col gap-y-4 mt-5'>
                                    <input type="hidden" name="_gotcha" />
                                    <div className='grid space-y-1'>
                                        <Label className='text-white'>Name</Label>
                                        <Input className='bg-stone-900 text-white' name='name' placeholder='Hatem Rihan' required />
                                    </div>
                                    <div className='grid space-y-1'>
                                        <Label className='text-white'>Email</Label>
                                        <Input className='bg-stone-900 text-white' name='email' placeholder='NaderEmad@example.com' required />
                                    </div>
                                    <div className='grid space-y-1'>
                                        <Label className='text-white'>Phone Number</Label>
                                        <Input className='bg-stone-900 text-white' name='phone' placeholder='+20 1234567899' required />
                                    </div>
                                    <div className='grid space-y-1'>
                                        <Label className='text-white'>Message</Label>
                                        <Textarea className='bg-stone-900 text-white' name='message' placeholder='Write your message here' required />
                                    </div>
                                    <Button className='flex items-center justify-center text-white' type='submit'>Submit</Button>
                                </form>
                            </TabsContent>
                        </CardContent>
                    </Tabs>
                </Card>

                {/* Video Section - Right Side */}
                <div className='relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl'>
                    <video
                        ref={videoRef}
                        className='absolute inset-0 w-full h-full object-cover'
                        autoPlay
                        loop
                        muted
                        playsInline
                        src="/VID ON BEACH.MP4"
                    />
                    {/* Overlay for better text visibility */}
                    <div className='absolute inset-0 bg-black/30'></div>
                    <div className='absolute inset-0 flex flex-col items-center justify-center text-white p-8'>
                        <h2 className='text-3xl font-bold mb-4 text-center'>Transform Your Life</h2>
                        <p className='text-lg text-center max-w-md'>
                            Join our community and start your fitness journey today
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm
