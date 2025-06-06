import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				tactflux: {
					neon: '#ff00ff',
					blue: '#00e8ff',
					purple: '#8b5cf6',
					dark: '#121212',
					card: '#1e1e1e',
					success: '#4ade80',
					input: '#333333',
					border: '#444444'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'glow': {
					'0%': { boxShadow: '0 0 5px rgba(0, 232, 255, 0.7)' },
					'50%': { boxShadow: '0 0 20px rgba(0, 232, 255, 0.9), 0 0 30px rgba(0, 232, 255, 0.5)' },
					'100%': { boxShadow: '0 0 5px rgba(0, 232, 255, 0.7)' }
				},
				'pulse-neon': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 2s infinite',
				'pulse-neon': 'pulse-neon 2s infinite',
				'float': 'float 6s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
			},
			backgroundImage: {
				'neon-gradient': 'linear-gradient(90deg, #ff00ff 0%, #8b5cf6 50%, #00e8ff 100%)'
			},
			boxShadow: {
				'neon': '0 0 5px rgba(255, 0, 255, 0.7), 0 0 10px rgba(255, 0, 255, 0.5)',
				'neon-hover': '0 0 10px rgba(255, 0, 255, 0.9), 0 0 20px rgba(255, 0, 255, 0.7), 0 0 30px rgba(255, 0, 255, 0.5)',
				'neon-blue': '0 0 5px rgba(0, 232, 255, 0.7), 0 0 10px rgba(0, 232, 255, 0.5)',
				'neon-blue-hover': '0 0 10px rgba(0, 232, 255, 0.9), 0 0 20px rgba(0, 232, 255, 0.7), 0 0 30px rgba(0, 232, 255, 0.5)',
				'card': '0 4px 15px rgba(0, 0, 0, 0.3)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
