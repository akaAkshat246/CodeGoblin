import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CodeGoblins Uncaught Error:', error, errorInfo);
    this.setState({ errorInfo });
    // In production, send to Sentry or monitoring webhook
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#09090F] flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-[#11111B] border border-red-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mx-auto flex items-center justify-center mb-6">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-red-500/20 text-red-400 uppercase tracking-widest">
              Runtime Exception Caught
            </span>

            <h1 className="text-2xl font-black text-[#F5F3FF] mt-3">
              A wild bug ambushed the Den
            </h1>

            <p className="text-xs text-[#A1A1B5] mt-2 leading-relaxed">
              Our goblin engineers have been alerted. You can safely reboot the session or return to the landing sanctuary.
            </p>

            {this.state.error && (
              <div className="mt-4 p-3 bg-black/40 rounded-xl text-left border border-white/5 font-mono text-[10px] text-red-300 overflow-x-auto max-h-24">
                {this.state.error.toString()}
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="goblin-btn-primary py-2.5 px-5 text-xs font-bold flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reboot Experience</span>
              </button>

              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="py-2.5 px-5 rounded-xl border border-white/10 text-xs font-semibold text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-white/5 transition flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Go to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

