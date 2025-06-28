'use client';

import { Mail, ShieldCheck, Send, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-start px-4 md:px-24 py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white space-y-16">
        {/* Hero Section */}
        <section className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Dive into the World of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              Anonymous Feedback
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Iqbal&apos;s Project – Where your identity remains a secret.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-6 text-center w-full max-w-6xl">
          <Card className="bg-gray-800 border border-gray-700 shadow-md">
            <CardHeader>
              <ShieldCheck className="w-10 h-10 mx-auto text-teal-400" />
              <CardTitle className="text-white mt-2">Fully Anonymous</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                We never reveal your identity. Say what you feel—freely and safely.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700 shadow-md">
            <CardHeader>
              <Send className="w-10 h-10 mx-auto text-blue-400" />
              <CardTitle className="text-white mt-2">Real-Time Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Instantly receive feedback and interact with others in real-time.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700 shadow-md">
            <CardHeader>
              <Users className="w-10 h-10 mx-auto text-purple-400" />
              <CardTitle className="text-white mt-2">Built for Everyone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Whether you&apos;re a creator, student, or team lead — this platform is for you.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Carousel Section */}
        <section className="w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-6">What People Are Saying</h2>
          <Carousel plugins={[Autoplay({ delay: 3000 })]}>
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="p-4">
                  <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl transition-all duration-300 hover:scale-[1.015]">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-white">
                        {message.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-start space-x-4">
                      <Mail className="text-blue-400 w-6 h-6 animate-pulse" />
                      <div>
                        <p className="text-gray-100">{message.content}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {message.received}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        {/* How It Works Section */}
        <section className="w-full max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                step: "1. Create Account",
                desc: "Sign up and get your unique anonymous feedback link.",
              },
              {
                step: "2. Share Your Link",
                desc: "Send your link to friends, followers, or teammates.",
              },
              {
                step: "3. Receive Honest Messages",
                desc: "Read what others think—completely anonymously.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="bg-gray-800 border border-gray-700 p-6 h-full"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.step}
                </h3>
                <p className="text-gray-400">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-3xl text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-6">
            Join thousands of users sharing feedback anonymously. Your voice matters.
          </p>
          <Link href="/sign-up">
          <Button className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg">
            Sign Up Now
          </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 bg-gray-950 text-gray-400 border-t border-gray-800">
        © {new Date().getFullYear()} Iqbal&apos;s Project. All rights reserved.
      </footer>
    </>
  );
}
