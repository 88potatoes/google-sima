import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Plus, Settings, Menu } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Component() {
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn !== undefined && !isSignedIn) {
      console.log("hi");
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  useEffect(() => {
    console.log(isSidebarOpen);
  }, [isSidebarOpen]);

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

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputMessage]);

  return (
    <div className="flex h-screen bg-gray-900 text-white w-screen m-0 p-0">
      {/* Sidebar Toggle Button */}

      {/* Sidebar */}
      {isSidebarOpen ? (
        <div className="flex flex-col p-2 w-64 bg-gray-800 border-r border-gray-700 transition-all duration-300 ease-in-out h-full z-40">
          <Button
            variant="default"
            size="icon"
            className="mx-2 mt-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5 text-white" />
          </Button>
          <div className="p-2 pt-4">
            <Button className="w-full justify-start mr-2" variant="default">
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-5rem)] ease-in-out duration-300">
            <div className="p-2 space-y-2"></div>
          </ScrollArea>
          <div className="absolute bottom-4 left-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`w-16 bg-gray-800 border-r border-gray-700 transition-all duration-300 ease-in-out h-full z-40 flex flex-col p-2 items-start`}
        >
          <Button
            variant="ghost"
            size="icon"
            className="mx-2 mt-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button className="mx-2 mt-4" variant="default" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-4 left-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top nav bar */}
        <div className="w-full h-12 sticky flex items-center px-4 justify-between border-b border-gray-700">
          <div>
            <b>Sima-GPT</b>
          </div>
          <UserButton />
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-2xl mx-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-4 max-w-sm ${
                    message.role === "user" ? "bg-blue-600" : "bg-gray-700"
                  } ${message.role === "user" ? "text-end" : "text-start"}`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-700 p-4">
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
      </div>
    </div>
  );
}
