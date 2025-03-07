
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VideoCall from "@/components/VideoCall";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ShieldCheck, Clock, FileText, MessageSquare, Pill, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const PatientView = () => {
  const [loading, setLoading] = useState(true);
//   const [callDuration, setCallDuration] = useState(0);
  const [waitingForDoctor, setWaitingForDoctor] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Simulate waiting for doctor
      setTimeout(() => {
        setWaitingForDoctor(false);
        toast({
          title: "Médico entrou na sala",
          description: "Dra. Melissa Santos se juntou à consulta",
        });
      }, 3000);
    }, 1500);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-medical-muted">
      <header className="w-full max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-medical text-white flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">TeleMed</h1>
          </div>
          <Badge variant="outline" className={cn(
            "transition-colors duration-300",
            waitingForDoctor
              ? "bg-amber-100/40 text-amber-600 border-amber-200/40"
              : "bg-medical-light/40 text-medical border-medical/20"
          )}>
            <Clock className="h-3 w-3 mr-1" />
            {waitingForDoctor ? "Aguardando médico" : "Consulta em andamento"}
          </Badge>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <Card className={cn(
              "overflow-hidden transition-all border-transparent shadow-xl",
              loading ? "animate-pulse bg-card/50" : "animate-scale-in"
            )}>
              <CardContent className="p-0">
                {loading ? (
                  <div className="aspect-video bg-medical-light/20 flex items-center justify-center">
                    <span className="text-medical">Preparando consulta...</span>
                  </div>
                ) : waitingForDoctor ? (
                  <div className="aspect-video bg-medical-light/10 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-medical-light/20 flex items-center justify-center mb-4 animate-pulse">
                      <ShieldCheck className="h-8 w-8 text-medical" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Sala de espera virtual</h3>
                    <p className="text-muted-foreground mb-4">O médico entrará na sala em breve</p>
                    <Badge className="animate-pulse bg-amber-100/40 text-amber-600 border-amber-200/40">
                      <Clock className="h-3 w-3 mr-1" />
                      Preparando conexão...
                    </Badge>
                  </div>
                ) : (
                  <VideoCall 
                    doctorName="Dra. Melissa Santos" 
                    doctorSpecialty="Clínica Geral"
                    duration={0}
                    isPatientView={true}
                  />
                )}
              </CardContent>
            </Card>

            <Card className="shadow-md border-transparent animate-slide-in">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-medical" />
                  Minha Consulta
                </CardTitle>
                <CardDescription>
                  Detalhes da sua consulta atual
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-medical-light/20 flex flex-col">
                    <span className="text-xs text-medical-dark/60 mb-1">Médico</span>
                    <span className="font-medium">Dra. Melissa Santos</span>
                    <span className="text-sm text-muted-foreground">Clínica Geral</span>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-medical-light/20 flex flex-col">
                    <span className="text-xs text-medical-dark/60 mb-1">Data</span>
                    <span className="font-medium">Hoje</span>
                    <span className="text-sm text-muted-foreground">14:30 - 15:00</span>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-medical-light/20 flex flex-col">
                    <span className="text-xs text-medical-dark/60 mb-1">Tipo</span>
                    <span className="font-medium">Teleconsulta</span>
                    <span className="text-sm text-muted-foreground">Online</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Pill className="h-4 w-4 text-medical" />
                    Seus Sintomas Informados
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-background">Dor de cabeça</Badge>
                    <Badge variant="outline" className="bg-background">Febre baixa</Badge>
                    <Badge variant="outline" className="bg-background">Fadiga</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild className="w-full gap-2">
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para Painel Principal
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="shadow-md border-transparent animate-slide-in">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-medical" />
                  Chat da Consulta
                </CardTitle>
                <CardDescription>
                  Envie mensagens ao médico
                </CardDescription>
              </CardHeader>
              <CardContent className="h-60 flex flex-col">
                <div className="flex-1 bg-medical-light/10 rounded-lg p-4 mb-4 overflow-y-auto">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-full bg-medical-light flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="h-4 w-4 text-medical" />
                      </div>
                      <div className="bg-medical-light/40 text-medical-dark p-2 rounded-lg rounded-tl-none max-w-[80%]">
                        <p className="text-sm">Olá! Seja bem-vindo à sua teleconsulta. A Dra. Melissa irá atendê-lo em breve.</p>
                      </div>
                    </div>
                    
                    {!waitingForDoctor && (
                      <div className="flex gap-2">
                        <div className="h-8 w-8 rounded-full bg-medical flex items-center justify-center flex-shrink-0">
                          <ShieldCheck className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-medical text-white p-2 rounded-lg rounded-tl-none max-w-[80%]">
                          <p className="text-sm">Olá! Sou a Dra. Melissa Santos. Em que posso ajudá-lo hoje?</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full p-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-medical" 
                    placeholder="Digite sua mensagem..." 
                  />
                  <Button className="absolute right-1 top-1 h-8 w-8 p-0" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md border-transparent bg-gradient-to-br from-medical/5 to-medical-light/20 animate-slide-in">
              <CardHeader>
                <CardTitle className="text-lg">Precisa de ajuda?</CardTitle>
                <CardDescription>
                  Estamos aqui para ajudar com qualquer problema técnico durante sua consulta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-medical hover:bg-medical-hover">
                  Suporte Técnico
                </Button>
                <div className="text-xs text-center text-muted-foreground">
                  Em caso de emergência médica, ligue para 192 (SAMU)
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientView;