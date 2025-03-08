import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import ramadanImage from '@/assets/images/ramadan-image.jpg'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import * as z from 'zod';

interface NikeWebsiteProps {
  // You can add props here if needed
}

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(8, 'Invalid phone number'),
    Gender: z.string().min(1, 'Please select your gender'),
    'Fitness Goals': z.string().min(1, 'Please select your fitness goals'),
    'Current Activity Level': z.string().min(1, 'Please select your activity level'),
    exercise_type: z.string().min(1, 'Please select your exercise type'),
    survey_submission: z.string().min(1, 'Please select yes or no')
});

const NikeWebsite: React.FC<NikeWebsiteProps> = () => {
    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData);
        
        try {
            // Validate form data
            formSchema.parse(formValues);
            
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "cf036439-fe84-4ef2-a54d-8cd90cc73a71",
                    ...formValues
                }),
            });
            const result = await response.json();
            if (result.success) {
                setError(null);
                router.push('/submit');
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    }

    return (
        <div className="bg-stone-900 text-white min-h-screen p-8">
            {error && (
                <div className="max-w-7xl mx-auto mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
                    {error}
                </div>
            )}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Contact Panel - Left Side */}

                {/* Contact Form - Right Side */}
                <div className="bg-stone-900 text-white shadow-lg overflow-hidden rounded-3xl">
                    <div className="p-4 flex items-center space-x-2">
  <div className="h-5 w-5 flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
  </div>
  <div className="flex-grow"></div>
                    </div>

                    <div className="p-6">
  <h2 className="text-4xl text-center font-bold mb-6">Nutrition info</h2>
  <p className="text-sm mb-6 text-center text-gray-400">
      please complete the form to request the programs you need.
  </p>

  <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="space-y-2">
      <Label className="text-white">Name</Label>
      <Input 
          className="bg-stone-900 text-white border-stone-700 focus:border-white transition-colors" 
          name="name" 
          placeholder="Hatem Rihan"
          required 
      />
  </div>

  <div className="space-y-2">
      <Label className="text-white">Phone Number</Label>
      <Input 
          className="bg-stone-900 text-white border-stone-700 focus:border-white transition-colors" 
          name="phone" 
          placeholder="+20 1234567899"
          required 
      />
  </div>
      </div>

      {/* Selections Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="space-y-2">
      <Label className="text-white">Gender</Label>
      <Select name="Gender" required>
          <SelectTrigger className="w-full bg-stone-900 text-white border-stone-700">
              <SelectValue className="text-stone-400" placeholder="Select"/>
          </SelectTrigger>
          <SelectContent>
              <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value="male">male</SelectItem>
                  <SelectItem value="female">female</SelectItem>
                  <SelectItem value="other">other</SelectItem>
              </SelectGroup>
          </SelectContent>
      </Select>
  </div>

  <div className="space-y-2">
      <Label className="text-white">Fitness Goals</Label>
      <Select name="Fitness Goals" required>
          <SelectTrigger className="w-full bg-stone-900 text-white border-stone-700">
              <SelectValue className="text-stone-400" placeholder="Select one"/>
          </SelectTrigger>
          <SelectContent>
              <SelectGroup>
                  <SelectLabel>What are your primary fitness goals?</SelectLabel>
                  <SelectItem value="Weight loss">Weight loss</SelectItem>
                  <SelectItem value="Muscle gain">Muscle gain</SelectItem>
                  <SelectItem value="Improve endurance">Improve endurance</SelectItem>
                  <SelectItem value="Increase energy">Increase energy</SelectItem>
                  <SelectItem value="General health">General health</SelectItem>
                  <SelectItem value="Maintain current weight">Maintain current weight</SelectItem>
              </SelectGroup>
          </SelectContent>
      </Select>
  </div>

  <div className="space-y-2">
      <Label className="text-white">Current Activity Level</Label>
      <Select name="Current Activity Level" required>
          <SelectTrigger className="w-full bg-stone-900 text-white border-stone-700">
              <SelectValue className="text-stone-400" placeholder="How often?"/>
          </SelectTrigger>
          <SelectContent>
              <SelectGroup>
                  <SelectLabel>Current Activity Level</SelectLabel>
                  <SelectItem value="0-1">0-1 times</SelectItem>
                  <SelectItem value="2-3">2-3 times</SelectItem>
                  <SelectItem value="4-5">4-5 times</SelectItem>
                  <SelectItem value="6-7">6-7 times</SelectItem>
              </SelectGroup>
          </SelectContent>
      </Select>
  </div>

  <div className="space-y-2">
      <Label className="text-white">Exercise Type</Label>
      <Select name="exercise_type" required>
          <SelectTrigger className="w-full bg-stone-900 text-white border-stone-700">
              <SelectValue className="text-stone-400" placeholder="Select one"/>
          </SelectTrigger>
          <SelectContent>
              <SelectGroup>
                  <SelectLabel>What type of exercise do you mainly do?</SelectLabel>
                  <SelectItem value="strength">Strength training</SelectItem>
                  <SelectItem value="cardio">Cardio (running, cycling, etc.)</SelectItem>
                  <SelectItem value="yoga">Yoga/Pilates</SelectItem>
                  <SelectItem value="hiit">HIIT</SelectItem>
              </SelectGroup>
          </SelectContent>
      </Select>
  </div>

  <div className="space-y-2 md:col-span-2">
      <Label className="text-white">Survey Submission</Label>
      <Select name="survey_submission" required>
          <SelectTrigger className="w-full bg-stone-900 text-white border-stone-700">
              <SelectValue className="text-stone-400" placeholder="Would you like personalized advice?"/>
          </SelectTrigger>
          <SelectContent>
              <SelectGroup>
                  <SelectLabel>Would you like personalized fitness and nutrition advice?</SelectLabel>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
              </SelectGroup>
          </SelectContent>
      </Select>
  </div>
      </div>

      {/* Terms and Submit Section */}
      <div className="space-y-4">
  <div className="flex items-start space-x-2">
      <input type="checkbox" id="terms" className="mt-1" required />
      <label htmlFor="terms" className="text-xs text-gray-400">
          I agree to the Terms and Conditions and Privacy Policy of the site
      </label>
  </div>

  <div className="flex items-center justify-between">
      <span className="text-sm text-gray-400">Get Plan</span>
      <Button 
          className="bg-white text-black hover:bg-gray-200 transition-colors" 
          type="submit"
      >
          Submit
      </Button>
  </div>
      </div>
  </form>
                    </div>
                </div>
                <div className="bg-stone-900 text-white rounded-3xl shadow-lg overflow-hidden">
                    
                    <div className="px-6 py-8">
  <h1 className="text-4xl font-bold mb-12 text-center">Contact us</h1>
                    
  <p className="text-sm mb-6">
      If you have questions or need any general information, please complete the form to
      request the information you need. It will be an honor to help you.
  </p>

  <div className="grid grid-cols-2 gap-6">
      <div>
  <h3 className="text-xs uppercase mb-3 font-medium">GENERAL INQUIRIES</h3>
  <p className="text-sm mb-1">Coaching</p>
  <p className="text-sm mb-1">Head of LA7</p>
  <p className="text-sm mb-3">Modeling</p>
  
  <h3 className="text-xs uppercase mt-4 mb-1 font-medium">PHONE</h3>
  <p className="text-sm mb-3">+10 1822 6899</p>
  
  <h3 className="text-xs uppercase mt-4 mb-1 font-medium">EMAIL</h3>
  <p className="text-sm">Nader.emad.25@gmail.com</p>
      </div>
      
      <div>
  <h3 className="text-xs uppercase mb-3 font-medium">SOCIAL MEDIA</h3>
  <a href="https://www.instagram.com/naderemad_?igsh=eWRoNmNhMTBydDZh"><p className="text-sm mb-1">Instagram</p></a>
  <a href="https://www.facebook.com/share/1WuLvFJyEJ/?mibextid=wwXIfr"><p className="text-sm mb-1">Facebook</p></a>
  <a href="mailto:Nader.emad.25@gmail.com"><p className="text-sm">Gmail</p></a>
      </div>
  </div>
                    </div>
                    
               
                </div>
            </div>
        </div>
    );
};

export default NikeWebsite;