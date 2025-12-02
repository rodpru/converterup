'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import type { ActionMode } from './action-selector';
import {
  useIsMobile,
  useOrientation,
  shareFile,
  downloadFile,
  canShare,
} from '@/lib/mobile-utils';
import { createSession, uploadDocument } from '@/app/actions';

// Ensure this component only runs on client
if (typeof window === 'undefined') {
  throw new Error('PDFViewer must only be rendered on the client side');
}

interface PDFViewerProps {
  file: File;
  mode: ActionMode;
  onBack: () => void;
}

export default function PDFViewer({ file, mode, onBack }: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [instance, setInstance] = useState<any>(null);
  const isMobile = useIsMobile();
  const orientation = useOrientation();

  const [sessionToken, setSessionToken] = useState<string | null>(null);

  // Fetch session token when file changes
  useEffect(() => {
    let isMounted = true;

    const initializeViewer = async () => {
      try {
        // 1. Upload document
        const formData = new FormData();
        formData.append('file', file);

        const uploadResult = await uploadDocument(formData);

        console.log('Nutrient API Upload Response:', uploadResult);
        if (!isMounted) return;

        if (!uploadResult.success || !uploadResult.documentId) {
          throw new Error(uploadResult.error || 'Failed to upload document');
        }

        // 2. Create session with new document ID
        const result = await createSession(uploadResult.documentId);

        console.log('Nutrient API Create Session Response:', result);
        if (!isMounted) return;

        if (!result.success || !result.sessionToken) {
          throw new Error(result.error || 'Failed to create session');
        }

        if (isMounted) {
          setSessionToken(result.sessionToken);
        }
      } catch (error) {
        console.error('Error initializing viewer:', error);
      }
    };

    initializeViewer();

    return () => {
      isMounted = false;
    };
  }, [file]);

  useEffect(() => {
    const container = containerRef.current;
    let viewerInstance: any = null;
    let NutrientViewer: any = null;

    if (typeof window !== 'undefined' && container && file && sessionToken) {
      const loadViewer = async () => {
        try {
          NutrientViewer = (await import('@nutrient-sdk/viewer')).default;

          // Ensure any previous instance is unloaded before loading a new one
          NutrientViewer.unload(container);

          const documentBlobObjectUrl = URL.createObjectURL(file);

          const config: any = {
            container,
            document: documentBlobObjectUrl,
            baseUrl: `${window.location.protocol}//${window.location.host}/nutrient/`,
            licenseKey: process.env.NUTRIENT_DWS_VIEWER_LICENSE_KEY || '',
            session: sessionToken,

            // Mobile-specific optimizations
            enableGestureZoom: true,

            // Adaptive toolbar based on device
            toolbarItems: isMobile
              ? [
                  // Navigation
                  { type: 'pager' },
                  { type: 'zoom-out' },
                  { type: 'zoom-in' },
                  { type: 'search' },
                  // Sidebar
                  { type: 'sidebar-thumbnails' },
                  { type: 'sidebar-bookmarks' },
                  { type: 'sidebar-annotations' },
                  // Annotations
                  { type: 'annotate' },
                  { type: 'ink' },
                  { type: 'signature' },
                  { type: 'stamp' },
                  { type: 'note' },
                  { type: 'text-highlighter' },
                  // Actions
                  { type: 'print' },
                ]
              : [
                  // LEFT SIDE - Navigation & View
                  { type: 'sidebar-thumbnails' },
                  { type: 'sidebar-document-outline' },
                  { type: 'sidebar-annotations' },
                  { type: 'sidebar-bookmarks' },
                  { type: 'pager' },
                  { type: 'zoom-out' },
                  { type: 'zoom-in' },
                  { type: 'zoom-mode' },

                  // LEFT SIDE - Annotations
                  { type: 'text-highlighter' },
                  { type: 'highlighter' },
                  { type: 'ink' },
                  { type: 'ink-eraser' },
                  { type: 'text' },
                  { type: 'note' },
                  { type: 'signature' },
                  { type: 'stamp' },
                  { type: 'image' },

                  // LEFT SIDE - Shapes dropdown
                  { type: 'arrow', dropdownGroup: 'shapes' },
                  { type: 'line', dropdownGroup: 'shapes' },
                  { type: 'rectangle', dropdownGroup: 'shapes' },
                  { type: 'ellipse', dropdownGroup: 'shapes' },
                  { type: 'polygon', dropdownGroup: 'shapes' },
                  { type: 'polyline', dropdownGroup: 'shapes' },

                  // LEFT SIDE - Document Tools
                  { type: 'content-editor' },
                  { type: 'document-editor' },
                  { type: 'document-crop' },

                  // CENTER SPACER
                  { type: 'spacer' },

                  // RIGHT SIDE - Actions
                  { type: 'search' },
                  { type: 'undo' },
                  { type: 'redo' },
                  { type: 'print' },
                  { type: 'export-pdf' },
                ],
          };

          // Mobile-optimized initial view state
          if (isMobile) {
            config.initialViewState = new NutrientViewer.ViewState({
              zoom: NutrientViewer.ZoomMode.FIT_TO_WIDTH,
              showPageLabels: true,
              sidebarMode: null, // Hide sidebar on mobile by default
            });
          } else if (mode === 'organize') {
            config.initialViewState = new NutrientViewer.ViewState({
              sidebarMode: NutrientViewer.SidebarMode.THUMBNAILS,
            });
          }

          viewerInstance = await NutrientViewer.load(config);

          setInstance(viewerInstance);

          // Apply mode-specific settings after load
          if (mode === 'edit') {
            // Use content editor mode for editing text
            viewerInstance.setViewState((v: any) =>
              v.set(
                'interactionMode',
                NutrientViewer.InteractionMode.CONTENT_EDITOR,
              ),
            );
          } else if (mode === 'sign') {
            viewerInstance.setViewState((v: any) =>
              v.set(
                'interactionMode',
                NutrientViewer.InteractionMode.SIGNATURE,
              ),
            );
          } else if (mode === 'annotate') {
            viewerInstance.setViewState((v: any) =>
              v.set('interactionMode', NutrientViewer.InteractionMode.INK),
            );
          }
        } catch (error) {
          console.error('Error loading Nutrient Viewer:', error);
        }
      };

      loadViewer();
    }

    return () => {
      if (container && NutrientViewer) {
        NutrientViewer.unload(container);
      }
    };
  }, [file, mode, isMobile, sessionToken]);

  // Handle orientation changes
  useEffect(() => {
    if (!instance) return;

    const updateLayoutMode = async () => {
      try {
        const NutrientViewer = (await import('@nutrient-sdk/viewer')).default;
        if (orientation === 'landscape') {
          instance.setViewState((v: any) =>
            v.set('layoutMode', NutrientViewer.LayoutMode.DOUBLE),
          );
        } else {
          instance.setViewState((v: any) =>
            v.set('layoutMode', NutrientViewer.LayoutMode.SINGLE),
          );
        }
      } catch (error) {
        console.error('Error updating layout mode:', error);
      }
    };

    updateLayoutMode();
  }, [orientation, instance]);

  const handleShare = async () => {
    const success = await shareFile(file);
    if (!success) {
      // Fallback to download if share is not supported
      downloadFile(file);
    }
  };

  const handleDownload = () => {
    downloadFile(file);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      {/* Sticky header for mobile navigation */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-foreground">
        <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="rounded-none border-foreground hover:bg-foreground hover:text-background transition-colors shrink-0 min-h-[36px] sm:min-h-[40px]"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <div className="flex flex-col min-w-0 flex-1">
            <h2 className="text-sm sm:text-lg font-serif text-foreground leading-none truncate">
              {file.name}
            </h2>
            <span className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest mt-0.5 sm:mt-1">
              {mode} Mode
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 ml-2 shrink-0">
          {canShare() && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="rounded-none border-foreground hover:bg-foreground hover:text-background transition-colors min-h-[36px] sm:min-h-[40px] px-2 sm:px-3"
              aria-label="Share document"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Share</span>
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="rounded-none border-foreground hover:bg-foreground hover:text-background transition-colors min-h-[36px] sm:min-h-[40px] px-2 sm:px-3"
            aria-label="Download document"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:inline ml-2">Download</span>
          </Button>
        </div>
      </div>

      {/* PDF Viewer Container */}
      <div
        ref={containerRef}
        className={cn(
          'flex-1 w-full h-full overflow-hidden bg-muted/20',
          isMobile ? 'pb-0' : '',
        )}
      />
    </div>
  );
}

// Import cn utility
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
