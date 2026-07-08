import { Card, CardContent } from "@/components/ui/card"
import { ReactNode } from "react"
import { motion } from "framer-motion"

interface StatChipProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  delay?: number;
}

export function StatChip({ icon, label, value, delay = 0 }: StatChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
    >
      <Card className="bg-background/40 backdrop-blur-md border-primary/20 hover:border-primary/50 transition-all shadow-sm hover:shadow-primary/10">
        <CardContent className="p-4 flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-full text-primary">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <h3 className="text-2xl font-bold font-display">{value}</h3>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
