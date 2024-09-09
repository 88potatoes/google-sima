import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Menu, X, Send } from "lucide-react"
import hero_image from "./assets/hero-image.jpg"
import gt_sym from "/gt-sym.png"
import { useState, useEffect, useRef } from 'react'
import { Textarea } from "./components/ui/textarea"
import { ScrollArea } from "@radix-ui/react-scroll-area"

export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I assist you today?" },
    { role: "user", content: "Can you explain what React is?" },
    {
      role: "assistant",
      content:
        'React is a popular JavaScript library for building user interfaces. It was developed by Facebook and is widely used for creating interactive, reusable UI components. React uses a virtual DOM (Document Object Model) to efficiently update and render components, which helps in building fast and scalable web applications. Its component-based architecture allows developers to create complex UIs from small, isolated pieces of code called "components".',
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { role: "user", content: inputMessage }]);
      setInputMessage("");
      // Here you would typically call an API to get the AI's response
      // For this example, we'll just add a placeholder response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "How about you Sima Balls 🤭.\nLOL",
          },
        ]);
      }, 1000);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const emailInput = emailInputRef.current;
    if (!emailInput) {
      return;
    }
    emailInput.value = "";

  }

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputMessage]);

  return (
    <div className="min-h-screen flex flex-col w-full items-center">
      <header className="px-6 h-14 flex items-center w-full container">
        <a className="flex items-center justify-center" href="#">
          <span className="sr-only">Sima-GPT</span>
          <img src={gt_sym} alt="Sima Symbol"/>
          <span className="ml-2 text-xl font-bold">Sima-GPT</span>
        </a>
        <nav className="ml-auto flex gap-6">
          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-14 md:top-0 left-0 right-0 bg-background md:bg-transparent p-4 md:p-0 gap-4 border-b md:border-none`}>
            <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Features
            </a>
            <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Pricing
            </a>
            <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
              About
            </a>
            <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Contact
            </a>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-16 xl:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Sima-GPT
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl dark:text-gray-400">
                    The fast open-source LLM. Power is at your fingertips.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a href="#try-it">
                    <Button>Get Started</Button>
                  </a>
                </div>
              </div>
              <img
                src={hero_image}
                width={550}
                height={550}
                alt="Hero Image"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="flex justify-center flex-col items-center pb-6">
          <div className="space-y-2 flex justify-center flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Try it out!
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl dark:text-gray-400">
              Get a feel of what it's all about.
            </p>
          </div>

        </section>

        <section className="w-full pb-6 bg-gray-700 rounded-xl" id="try-it">
          <div className="w-full h-12 sticky flex items-center px-4 justify-between border-b border-gray-800">
            <div>
              <b>Sima-GPT</b>
            </div>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="max-w-2xl mx-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`rounded-lg p-4 max-w-sm ${message.role === "user" ? "bg-blue-600" : "bg-gray-800"
                      } ${message.role === "user" ? "text-end" : "text-start"}`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-gray-800 p-4">
            <div className="max-w-2xl mx-auto flex items-end">
              <Textarea
                ref={textareaRef}
                className="flex-1 mr-2 min-h-[40px] max-h-[200px] overflow-y-auto resize-none"
                placeholder="Type your message here..."
                value={inputMessage}
                onChange={handleTextareaChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Stay Updated
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl dark:text-gray-400">
                  Subscribe to our newsletter for the latest updates and innovations.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2 border-gray-900">
                <form className="flex space-x-2" onSubmit={handleEmail}>
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                    ref={emailInputRef}
                  />
                  <Button type="submit">
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Sima-GPT. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  )
}
export default App;
