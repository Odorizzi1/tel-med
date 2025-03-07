import { useState, useEffect } from "react";
import VideoCall from "@/components/VideoCall";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldCheck, Clock, CalendarClock, FileText, Pill } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [loading, setLoading] = useState(true);
//   const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
          <Badge variant="outline" className="bg-medical-light/40 text-medical border-medical/20">
            <Clock className="h-3 w-3 mr-1" />
            Consulta em andamento
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
                    <span className="text-medical">Carregando consulta...</span>
                  </div>
                ) : (
                  <VideoCall 
                    doctorName="Dra. Melissa Santos" 
                    doctorSpecialty="Clínica Geral"
                    duration={0}
                  />
                )}
              </CardContent>
            </Card>

            <Card className="shadow-md border-transparent animate-slide-in">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-medical" />
                  Resumo da Consulta
                </CardTitle>
                <CardDescription>
                  Informações sobre a consulta atual
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
                    Sintomas Relatados
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-background">Dor de cabeça</Badge>
                    <Badge variant="outline" className="bg-background">Febre baixa</Badge>
                    <Badge variant="outline" className="bg-background">Fadiga</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="shadow-md border-transparent animate-slide-in">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarClock className="h-5 w-5 text-medical" />
                  Próximas Consultas
                </CardTitle>
                <CardDescription>
                  Seu calendário médico
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg border border-medical-light transition-all hover:bg-medical-light/10">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Dr. Ricardo Alves</span>
                    <Badge variant="outline" className="h-5 text-[10px]">Cardiologia</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">22/06/2023</span>
                    <span className="text-medical">10:00</span>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg border border-medical-light transition-all hover:bg-medical-light/10">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Dra. Laura Costa</span>
                    <Badge variant="outline" className="h-5 text-[10px]">Dermatologia</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">30/06/2023</span>
                    <span className="text-medical">15:30</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-2">
                  Ver todas as consultas
                </Button>
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

export default Index;
