import { Atividades } from "../charts/atividadesLastMonth"
import { KmAtividades } from "../charts/kmPercorridoLastMonth"
import {
    Card,
  } from "@/components/ui/card";
import { Pace } from "../charts/melhorPaceLastMonth";
import { AtivLonga } from "../charts/atividMaisLonga";

function StravaBoard(){
    return (
            <Card className="grid grid-cols-1 sm:grid-cols-2 w-full">
                <KmAtividades/>
                <Atividades />
                <Pace />
                <AtivLonga />
            </Card>
    )
}

export default StravaBoard