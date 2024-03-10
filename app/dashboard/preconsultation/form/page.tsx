'use client';

import { DrawerComponent } from "@/components/Drawer";
import SwitchButton from "@/components/SwitchButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Drive from "../../drive/page";

export default function PreconsultationForm() {

  const [isSelected, setIsSelected] = useState(false);

  const handleSwitchChange = () => {
    setIsSelected(!isSelected)
  }


  return(
    <div className="bg-light-green w-full">
      <div className="text-2xl my-5">Préconsultation #1</div>
      <div className="flex justify-around">
        <div className="flex flex-col gap-4">
          <div>  
            <Label htmlFor="lieu" className="text-base">Lieu d'apparition</Label>
            <Input
              name="lieu"
              required
              className="rounded-xl text-main-dark"
            />
          </div>
          <div>  
            <Label htmlFor="lieu" className="text-base">Depuis combien de temps est-il apparu ?</Label>
            <Input
              name="how-long"
              required
              className="rounded-xl text-main-dark"
            />
          </div>
          <div className="flex items-start">  
            <SwitchButton label="Avez vous d'autres symptomes depuis son apprition ?"/>
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="other-sympt" className="text-base">Si oui lesquels ?</Label>
            <Textarea />
          </div>
          <div className="flex items-start">  
            <SwitchButton label="Avez vous des douleurs à cet endroit ?"/>
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="scale" className="text-base">Sur quel échelle est la douleur ?</Label>
            <DrawerComponent />
          </div>
        </div>
        <Separator orientation="vertical" className="bg-gray-600"/>
        <div>
          <div>
            <SwitchButton label="Avez-vous des antécédents de cancer dans votre famille ?" />
          </div>
          <div>
            <SwitchButton label="Suivez-vous un traitement actuellement ?" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="other-sympt" className="text-base">Lesquels ? (precisez la fréquence de votre prise de médicament)</Label>
            <Textarea />
          </div>
          <div>
            <SwitchButton label="Avez-vous constaté un changement (taille, couleur, ...) depuis son apparition ?" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="other-sympt" className="text-base">Avez-vous d'autres remarques à remonter ?</Label>
            <Textarea />
          </div>
        </div>
      </div>
      <div>
        <Drive />
      </div>
    </div>
  )
}