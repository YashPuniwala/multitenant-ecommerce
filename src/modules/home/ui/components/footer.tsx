export const Footer = () => {
    return (
        <footer className="border-t bg-card/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center font-medium p-8">
                <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">© 2024 funroad, Inc.</p>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms</a>
                    <a href="#" className="hover:text-primary transition-colors">Support</a>
                </div>
            </div>
        </footer>
    )
}