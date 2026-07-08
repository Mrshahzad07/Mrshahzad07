import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import * as si from "simple-icons"

const MY_STACK = [
  { name: "React", icon: si.siReact, color: "#61DAFB" },
  { name: "Python", icon: si.siPython, color: "#3776AB" },
  { name: "FastAPI", icon: si.siFastapi, color: "#009688" },
  { name: "Spring Boot", icon: si.siSpringboot, color: "#6DB33F" },
  { name: "TypeScript", icon: si.siTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: si.siTailwindcss, color: "#06B6D4" },
  { name: "n8n", icon: si.siN8n, color: "#FF6D5A" },
  { name: "GraphQL", icon: si.siGraphql, color: "#E10098" },
  { name: "PostgreSQL", icon: si.siPostgresql, color: "#4169E1" },
  { name: "Docker", icon: si.siDocker, color: "#2496ED" },
]

export function TechStackCloud() {
  return (
    <Card className="bg-background/40 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-display text-primary">Tech I Ship With</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center p-6">
        <div className="flex flex-wrap justify-center gap-4">
          {MY_STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-colors shadow-sm"
            >
              <svg 
                role="img" 
                viewBox="0 0 24 24" 
                fill={tech.color} 
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={tech.icon.path} />
              </svg>
              <span className="text-xs font-medium text-muted-foreground">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
