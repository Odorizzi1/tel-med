import { useState, useEffect } from "react";
import { 
  Mic, MicOff, Video, VideoOff, Phone, 
  MessageSquare, MoreVertical, User,
  Settings, Volume2, VolumeX, ZoomIn, Clipboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface VideoCallProps {
  doctorName?: string;
  doctorSpecialty?: string;
  duration?: number;
  isConnected?: boolean;
  isPatientView?: boolean;
}

const VideoCall = ({
  doctorName = "Dra. Melissa Santos",
  doctorSpecialty = "Clínica Geral",
  duration = 0,
  isConnected = true,
  isPatientView = false,
}: VideoCallProps) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(duration);
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">(
    isConnected ? "connected" : "connecting"
  );
  const { toast } = useToast();

  useEffect(() => {
    if (connectionStatus !== "connected") return;
    
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [connectionStatus]);

  useEffect(() => {
    if (connectionStatus === "connecting") {
      const timer = setTimeout(() => {
        setConnectionStatus("connected");
        toast({
          title: isPatientView ? "Conexão estabelecida com o médico" : "Conexão estabelecida",
          description: isPatientView 
            ? `Você está conectado com ${doctorName}`
            : `Você está conectado com o paciente`,
        });
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [connectionStatus, doctorName, toast, isPatientView]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleMic = () => {
    setMicEnabled(!micEnabled);
    toast({
      title: micEnabled ? "Microfone desativado" : "Microfone ativado",
      duration: 2000,
    });
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    toast({
      title: videoEnabled ? "Câmera desativada" : "Câmera ativada",
      duration: 2000,
    });
  };

  const toggleSpeaker = () => {
    setSpeakerEnabled(!speakerEnabled);
    toast({
      title: speakerEnabled ? "Alto-falante desativado" : "Alto-falante ativado",
      duration: 2000,
    });
  };

  const endCall = () => {
    setConnectionStatus("disconnected");
    toast({
      title: "Chamada encerrada",
      description: `Duração: ${formatTime(elapsedTime)}`,
      variant: "destructive",
    });
  };

  const copyMeetingLink = () => {
    navigator.clipboard.writeText("https://telemedic.exemplo.com/sala/123456789");
    toast({
      title: "Link copiado",
      description: "O link da consulta foi copiado para a área de transferência",
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Status bar */}
      <div className="w-full px-4 py-3 glass-effect z-10 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center gap-3">
          <Badge 
            variant="outline" 
            className={cn(
              "px-3 py-1 transition-all", 
              connectionStatus === "connected" 
                ? "bg-medical-success/10 text-medical-success border-medical-success/20" 
                : connectionStatus === "connecting" 
                  ? "bg-medical/10 text-medical border-medical/20 animate-pulse" 
                  : "bg-medical-error/10 text-medical-error border-medical-error/20"
            )}
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                connectionStatus === "connected" ? "bg-medical-success" : 
                connectionStatus === "connecting" ? "bg-medical" : "bg-medical-error"
              )}></span>
              <span className={cn(
                "relative inline-flex rounded-full h-2 w-2",
                connectionStatus === "connected" ? "bg-medical-success" : 
                connectionStatus === "connecting" ? "bg-medical" : "bg-medical-error"
              )}></span>
            </span>
            {connectionStatus === "connected" ? "Conectado" : 
             connectionStatus === "connecting" ? "Conectando..." : "Desconectado"}
          </Badge>
          <span className="text-sm font-medium text-muted-foreground">
            {formatTime(elapsedTime)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-background/80"
                  onClick={copyMeetingLink}
                >
                  <Clipboard className="h-4 w-4 text-medical" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copiar link da consulta</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-background/80"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configurações</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Main call area */}
      <div className="relative flex-1 bg-gradient-to-b from-medical-light/30 to-background overflow-hidden">
        {/* Doctor/Patient video - main video */}
        <div className="absolute inset-0 flex items-center justify-center animate-blur-in">
          {videoEnabled ? (
            <div className="w-full h-full max-w-4xl aspect-video relative mx-auto mt-4 rounded-2xl overflow-hidden shadow-xl">
              {/* Simulated video with a gradient background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-medical-dark/5 to-medical-light/20 animate-pulse-subtle"></div>
              
              <div className="absolute top-4 left-4 glass-effect px-3 py-1.5 rounded-lg flex items-center gap-2 animate-fade-in">
                <Avatar className="h-8 w-8 border-2 border-white">
                  <User className="h-4 w-4" />
                </Avatar>
                <div className="flex flex-col">
                  {isPatientView ? (
                    <>
                      <span className="text-sm font-medium">{doctorName}</span>
                      <span className="text-xs text-muted-foreground">{doctorSpecialty}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-medium">Paciente</span>
                      <span className="text-xs text-muted-foreground">Em consulta</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Card className="w-full h-full max-w-4xl aspect-video relative mx-auto mt-4 flex items-center justify-center bg-medical-light/20 rounded-2xl animate-pulse-subtle">
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4 bg-medical-light border-4 border-white">
                  <User className="h-10 w-10 text-medical" />
                </Avatar>
                {isPatientView ? (
                  <>
                    <h3 className="text-xl font-medium">{doctorName}</h3>
                    <p className="text-sm text-muted-foreground">{doctorSpecialty}</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-medium">Paciente</h3>
                    <p className="text-sm text-muted-foreground">Em consulta</p>
                  </>
                )}
                <Badge className="mt-2 bg-medical-light/50 text-medical border-none">Câmera desativada</Badge>
              </div>
            </Card>
          )}
        </div>
        
        {/* Self video - picture in picture */}
        <div className="absolute bottom-28 md:bottom-24 right-4 md:right-8 w-32 md:w-48 aspect-video rounded-lg overflow-hidden shadow-lg border-2 border-white z-10 animate-scale-in">
          <div className={cn(
            "w-full h-full",
            videoEnabled 
              ? "bg-gradient-to-br from-gray-900/80 to-gray-800/80" 
              : "bg-medical-light/20 flex items-center justify-center"
          )}>
            {!videoEnabled && (
              <User className="h-8 w-8 text-medical/50" />
            )}
          </div>
          <div className="absolute top-1 right-1">
            <Badge variant="secondary" className="h-5 px-1 text-[10px] bg-black/40 text-white border-none">
              Você
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Control bar */}
      <div className="p-4 glass-effect rounded-b-lg z-10">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-full h-12 w-12 transition-all",
                    !micEnabled && "bg-medical-light text-medical hover:bg-medical-light/80"
                  )}
                  onClick={toggleMic}
                >
                  {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{micEnabled ? "Desativar microfone" : "Ativar microfone"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-full h-12 w-12 transition-all",
                    !videoEnabled && "bg-medical-light text-medical hover:bg-medical-light/80"
                  )}
                  onClick={toggleVideo}
                >
                  {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{videoEnabled ? "Desativar câmera" : "Ativar câmera"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-full h-12 w-12 transition-all",
                    !speakerEnabled && "bg-medical-light text-medical hover:bg-medical-light/80"
                  )}
                  onClick={toggleSpeaker}
                >
                  {speakerEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{speakerEnabled ? "Desativar alto-falante" : "Ativar alto-falante"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Separator orientation="vertical" className="h-8 mx-1" />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  className="rounded-full h-12 w-12 bg-medical-error hover:bg-medical-error/90"
                  onClick={endCall}
                >
                  <Phone className="h-5 w-5 rotate-[135deg]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Encerrar chamada</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Separator orientation="vertical" className="h-8 mx-1" />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Abrir chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                  <ZoomIn className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ampliar visualização</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mais opções</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;