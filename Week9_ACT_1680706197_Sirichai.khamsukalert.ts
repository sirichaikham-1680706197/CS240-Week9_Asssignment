
/* PART 1: Primitive Types */
let appName: string = "CS319 Todo App";
let version: number = 1.0;
let maxTodos: number = 10;
let isReady: boolean = true;
let lastSyncAt: undefined = undefined;

/* PART 2: Custom Types */
enum Priority {
    Low = "low",
    Medium = "medium",
    High = "high"
}

interface Todo {
    id: number;
    title: string;
    completed: boolean;
    priority: Priority;
    tags: string[];
    dueDate?: string;
}

/* PART 3: Arrays */
const categories: string[] = ["Study", "Work", "Personal"];

const todos: Todo[] = [
    {
        id: 1,
        title: "Learn HTML",
        completed: true,
        priority: Priority.Low,
        tags: ["study", "web"]
    },
    {
        id: 2,
        title: "Learn CSS",
        completed: true,
        priority: Priority.Medium,
        tags: ["study", "web"]
    },
    {
        id: 3,
        title: "Learn JavaScript",
        completed: false,
        priority: Priority.High,
        tags: ["study"],
        dueDate: "2026-10-20"
    },
    {
        id: 4,
        title: "Learn TypeScript",
        completed: false,
        priority: Priority.High,
        tags: []
    }
];

/* PART 4: Functions */

// Add a new Todo
function addTodo(todo: Todo): boolean {
    if (todos.length >= maxTodos) {
        console.log("List is full!");
        return false;
    }

    todos.push(todo);
    console.log(`Added "${todo.title}" to list!`);
    return true;
}

// Find a Todo by ID
function findTodoById(id: number): Todo | undefined {
    return todos.find(function(todo) {
        return todo.id === id;
    });
}

// Mark a Todo as completed
function markAsComplete(id: number): boolean {
    const todo = findTodoById(id);

    if (todo === undefined) {
        console.log(`Todo id ${id} not found!`);
        return false;
    }

    todo.completed = true;
    return true;
}

// Remove a Todo by ID
function removeTodo(id: number): boolean {
    const index = todos.findIndex(function(todo) {
        return todo.id === id;
    });

    if (index === -1) {
        return false;
    }

    todos.splice(index, 1);
    return true;
}

// Find Todos by priority
function filterByPriority(priority: Priority): Todo[] {
    return todos.filter(function(todo) {
        return todo.priority === priority;
    });
}

// Search Todos by title
function searchByTitle(keyword: string): Todo[] {
    return todos.filter(function(todo) {
        return todo.title.toLowerCase().includes(keyword.toLowerCase());
    });
}

// Count Todo statistics
function getStats() {
    const total = todos.length;
    let completed = 0;

    for (const todo of todos) {
        if (todo.completed) {
            completed++;
        }
    }

    const pending = total - completed;
    let completionRate = 0;

    if (total > 0) {
        completionRate = Math.round((completed / total) * 100);
    }

    return {
        total: total,
        completed: completed,
        pending: pending,
        completionRate: completionRate
    };
}

// Format a Todo for display
function formatTodo(todo: Todo): string {
    let checkbox = "[ ]";

    if (todo.completed) {
        checkbox = "[x]";
    }

    let dueDate = "";

    if (todo.dueDate !== undefined) {
        dueDate = ` (due ${todo.dueDate})`;
    }

    return `${checkbox} #${todo.id} ${todo.title} [${todo.priority}]${dueDate}`;
}

// Display all Todos
function printAll(): void {
    console.log(`--- ${appName} v${version} ---`);

    for (const todo of todos) {
        console.log(formatTodo(todo));
    }
}

/* PART 5: Run the app */

// Display the original list
printAll();

// Add Learn React
addTodo({
    id: 5,
    title: "Learn React",
    completed: false,
    priority: Priority.Medium,
    tags: ["web"]
});

// Complete Learn JavaScript
markAsComplete(3);

// Remove Learn HTML
removeTodo(1);

// Show high-priority Todos
console.log(
    "High priority :",
    filterByPriority(Priority.High).length,
    "items"
);

// Search for Todos
console.log(
    "Search 'learn t' :",
    searchByTitle("learn t").map(formatTodo)
);

// Show categories
console.log("Categories :", categories.join(", "));

// Show statistics
console.log("Stats :", getStats());

// Show application status
console.log("Ready?", isReady, "| Last sync :", lastSyncAt);

// Display the updated list
printAll();
