
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { mockTickets, mockUsers } from "@/lib/data";
import { ChevronDown, Plus, Search } from "lucide-react";
import type { Ticket } from "@/lib/types";

const priorityColors = {
  HIGH: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  MEDIUM: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  LOW: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
};

const statusColors = {
  "IN PROGRESS": "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  NEW: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  CLOSED: "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300",
};


export default function TicketsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState<Ticket['priority'] | "All">("All");
    const [assigneeFilter, setAssigneeFilter] = useState("All");

    const assignees = [...new Set(mockTickets.map(t => t.assignedTo))];

    const filteredTickets = mockTickets.filter(ticket => {
        const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) || ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || 
            (statusFilter === "Open" && (ticket.status === "NEW" || ticket.status === "IN PROGRESS")) ||
            (statusFilter === "Closed" && ticket.status === "CLOSED");
        const matchesPriority = priorityFilter === "All" || ticket.priority === priorityFilter;
        const matchesAssignee = assigneeFilter === "All" || ticket.assignedTo === assigneeFilter;

        return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
    });


  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Support Tickets
        </h1>
        <div className="flex gap-2 items-center">
            <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search tickets..." 
                    className="pl-8 w-64" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Ticket
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-2 p-4 bg-card rounded-lg border">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{statusFilter} Tickets <ChevronDown className="ml-2 h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setStatusFilter("All")}>All Tickets</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setStatusFilter("Open")}>Open Tickets</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setStatusFilter("Closed")}>Closed Tickets</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{priorityFilter === "All" ? "All Priorities" : priorityFilter} <ChevronDown className="ml-2 h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setPriorityFilter("All")}>All Priorities</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setPriorityFilter("HIGH")}>High</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setPriorityFilter("MEDIUM")}>Medium</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setPriorityFilter("LOW")}>Low</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{assigneeFilter === "All" ? "All Assignees" : assigneeFilter} <ChevronDown className="ml-2 h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setAssigneeFilter("All")}>All Assignees</DropdownMenuItem>
                {assignees.map(assignee => (
                     <DropdownMenuItem key={assignee} onSelect={() => setAssigneeFilter(assignee)}>{assignee}</DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="bg-card border rounded-lg p-4">
            <div className="flex items-center gap-4 mb-2">
                <span className="text-muted-foreground text-sm">#{ticket.id}</span>
                <Badge className={priorityColors[ticket.priority]}>{ticket.priority}</Badge>
                <Badge className={statusColors[ticket.status]}>{ticket.status}</Badge>
            </div>
            <h2 className="text-lg font-semibold font-headline">{ticket.title}</h2>
            <p className="text-muted-foreground text-sm mt-1 mb-3">{ticket.description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Assigned to: <span className="font-medium text-foreground">{ticket.assignedTo}</span></span>
                <span>Reported by: <span className="font-medium text-foreground">{ticket.reportedBy}</span></span>
                <span>Created: <span className="font-medium text-foreground">{ticket.created}</span></span>
            </div>
          </div>
        ))}
        {filteredTickets.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
                No tickets found.
            </div>
        )}
      </div>
    </div>
  );
}
