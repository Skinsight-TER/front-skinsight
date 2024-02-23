'use client';

import SwitchButton from "@/components/SwitchButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function PreconsultationForm() {

  const [isSelected, setIsSelected] = useState(false);

  const handleSwitchChange = () => {
    setIsSelected(!isSelected)
  }

  return(
    <div>
      <div className="text-2xl mt-5">Préconsultation #1</div>
      <div>
        <div className="flex flex-col gap-4">
          <div>  
            <Label htmlFor="lieu">Lieu d'apparition</Label>
            <Input
              name="lieu"
              required
              className="rounded-xl text-main-dark"
            />
          </div>
          <div>  
            <Label htmlFor="lieu">Depuis combien de temps est-il apparu ?</Label>
            <Input
              name="how-long"
              required
              className="rounded-xl text-main-dark"
            />
          </div>
          <div>  
            <SwitchButton label="Avez vous d'autres symptomes depuis son apprition ?"/>
          </div>
        </div>
      </div>
    </div>
  )
}