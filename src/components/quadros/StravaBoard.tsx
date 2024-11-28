import { Atividades } from "../charts/atividadesLastMonth"
import { KmAtividades } from "../charts/kmPercorridoLastMonth"
import {
    Card,
  } from "@/components/ui/card";

function StravaBoard(){
    return (
        
            <Card className="grid grid-cols-1 sm:grid-cols-2 w-full">
                <KmAtividades/>
                <Atividades />
                <Atividades />
                <Atividades />
                </Card>

    )
}

export default StravaBoard