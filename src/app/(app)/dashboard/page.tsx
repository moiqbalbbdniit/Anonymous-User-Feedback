"use client";

import { MessageCard } from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Message, User } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw, Copy } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import clsx from "clsx";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { data: session } = useSession();
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessage");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-message");
      setValue("acceptMessage", !!response.data.isAcceptingMessages  );
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast(axiosError.response?.data.message ?? axiosError.message);
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessage = useCallback(async (refresh = false) => {
  setIsLoading(true);
  try {
    const response = await axios.get<ApiResponse>("/api/get-messages");
    setMessages(response.data.messages ?? []);

    // 👇 also refresh the switch state
    const statusRes = await axios.get<ApiResponse>("/api/accept-message");
    setValue("acceptMessage", statusRes.data.isAcceptingMessages ?? false);

    if (refresh) toast("Showing latest messages");
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    toast(axiosError.response?.data.message ?? axiosError.message);
  } finally {
    setIsLoading(false);
  }
}, [setValue]);


  useEffect(() => {
    if (!session?.user) return;
    fetchAcceptMessage();
    fetchMessage();
    
  }, [session, fetchAcceptMessage, fetchMessage]);

  const handleSwitchChange = async () => {
    try {
      const updated = !acceptMessages;
      await axios.post<ApiResponse>("/api/accept-message", {
        acceptMessage: updated,
      });
      setValue("acceptMessage", updated);
      toast(`Messages ${updated ? "enabled" : "disabled"}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast(axiosError.response?.data.message ?? axiosError.message);
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((msg) => msg._id !== messageId));
  };

  if (!session?.user) return <div className="text-center py-10">You must be logged in to access this page.</div>;

  const { username } = session.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded-xl shadow-xl w-full max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">🎯 User Dashboard</h1>

      {/* Link Copy */}
      <div className="mb-6 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">Your Anonymous Message Link</h2>
        <div className="flex flex-col md:flex-row items-stretch gap-2">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="bg-gray-100 px-4 py-2 rounded-md border w-full text-gray-700 text-sm cursor-default"
          />
          <Button variant="secondary" onClick={copyToClipboard} className="flex gap-2 items-center">
            <Copy size={16} /> Copy Link
          </Button>
        </div>
      </div>

      {/* Toggle Switch */}
      <div className="flex items-center gap-3 mb-6">
        <Switch
          {...register("acceptMessage")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className={clsx("text-sm font-medium", acceptMessages ? "text-green-600" : "text-red-600")}>
          Accept Messages: {acceptMessages ? "Enabled" : "Disabled"}
        </span>
      </div>

      <Separator />

      {/* Refresh Messages */}
      <div className="mt-6 flex justify-end">
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            fetchMessage(true);
          }}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4 mr-2" />}
          Refresh
        </Button>
      </div>

      {/* Messages Display */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <MessageCard
              key={String(msg._id)}
              message={msg}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p className="text-gray-500">No messages received yet.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
