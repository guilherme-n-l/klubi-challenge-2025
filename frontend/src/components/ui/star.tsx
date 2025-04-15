import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {Star} from "lucide-react";

const Github: React.FC = () =>(
    <Button onClick={() => window.open("https://github.com/guilherme-n-l", "_blank")}>
        <Star className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        <span className="flex items-baseline gap-2">
        Star
        <span className="text-xs text-primary-foreground/60">729</span>
      </span>
    </Button>
)

export default Github;