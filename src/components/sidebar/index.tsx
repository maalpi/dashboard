import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Home, Package2, PanelBottom, Settings2, ShoppingBag, Users2 } from "lucide-react"
import Link from "next/link"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import DarkLightToggle from "../switch/theme"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

export function Sidebar() {
    return (
        <div className="flex w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex flex-col">
                <nav className="flex flex-col items-center gap-4 px-2 py-5">
                    <TooltipProvider>
                        <Link href='#'
                            className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground rounded-full">
                            <Avatar>
                                <AvatarImage src="https://avatars.githubusercontent.com/u/54381772?v=4" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="sr-only">Dashboard</span>
                        </Link>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href='/'
                                    className="flex h-9 w-9 shrink-0 items-center justify-center 
                                    rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Home className="h-5 w-5"/>
                                    <span className="sr-only">Inicio</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Inicio</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href='#'
                                    className="flex h-9 w-9 shrink-0 items-center justify-center 
                                    rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <ShoppingBag className="h-5 w-5"/>
                                    <span className="sr-only">Pedidos</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Pedidos</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href='/kanban'
                                    className="flex h-9 w-9 shrink-0 items-center justify-center 
                                    rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Package2 className="h-5 w-5"/>
                                    <span className="sr-only">Produtos</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Kanban</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href='#'
                                    className="flex h-9 w-9 shrink-0 items-center justify-center 
                                    rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Users2 className="h-5 w-5"/>
                                    <span className="sr-only">Clientes</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Clientes</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href='#'
                                    className="flex h-9 w-9 shrink-0 items-center justify-center 
                                    rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Settings2 className="h-5 w-5"/>
                                    <span className="sr-only">Configurações</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Configurações</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>

                <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
                    <TooltipProvider>
                        <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className="flex h-9 w-9 shrink-0 items-center justify-center 
                                        rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        <DarkLightToggle/>
                                        <span className="sr-only">Tema</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side='right'>Tema</TooltipContent>
                            </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>


            <div className="sm:hidden flex flex-row sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center px-4 gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelBottom className="w-5 h-5" />
                                <span className="sr-only">abrir / fechar menu</span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link 
                                    href="#" 
                                    className="flex h-10 w-10 bg-primary rounded-full text-lg items-center 
                                            justify-center text-primary-foreground md:text-base gap-2"
                                    prefetch={false}
                                >
                                    <Avatar>
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/54381772?v=4" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>

                                <Link 
                                    href="#" 
                                    className="flex px-2.5 gap-4 text-muted-foreground items-center 
                                            hover:text-foreground"
                                    prefetch={false}
                                >
                                    <Home className="h-5 w-5 transition-all"/>
                                    Inicio
                                </Link>

                                <Link 
                                    href="#" 
                                    className="flex px-2.5 gap-4 text-muted-foreground items-center 
                                            hover:text-foreground"
                                    prefetch={false}
                                >
                                    <ShoppingBag className="h-5 w-5 transition-all"/>
                                    Pedidos
                                </Link>

                                <Link 
                                    href="#" 
                                    className="flex px-2.5 gap-4 text-muted-foreground items-center 
                                            hover:text-foreground"
                                    prefetch={false}
                                >
                                    <Package2 className="h-5 w-5 transition-all"/>
                                    Produtos
                                </Link>

                                <Link 
                                    href="#" 
                                    className="flex px-2.5 gap-4 text-muted-foreground items-center 
                                            hover:text-foreground"
                                    prefetch={false}
                                >
                                    <Users2 className="h-5 w-5 transition-all"/>
                                    Clientes
                                </Link>

                                <Link 
                                    href="#" 
                                    className="flex px-2.5 gap-4 text-muted-foreground items-center 
                                            hover:text-foreground"
                                    prefetch={false}
                                >
                                    <Settings2 className="h-5 w-5 transition-all"/>
                                    Configurações
                                </Link>
                            </nav>
                            
                        </SheetContent>

                    </Sheet>

                    <h2> Menu </h2>

                </header>
                <nav className="ml-auto py-5 flex flex-col items-end px-5">
                                <div
                                    className="flex shrink-0 
                                    rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <DarkLightToggle/>
                                    <span className="sr-only">Tema</span>
                            </div>
                    </nav>
            </div>

        </div>
    )
}