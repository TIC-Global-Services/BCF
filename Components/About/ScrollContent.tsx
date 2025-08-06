'use client';
import React, { useEffect, useRef } from 'react';

const ScrollContentImages = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imagesRef = useRef([]);

  const contentData = [
    {
      title: "Diversity & Inclusion<br />Policy",
      text: "At Bhuma Cast Factory, we are committed to building a workplace that reflects the diversity of the communities we serve and fosters a culture of inclusion, respect, and equal opportunity.",
      overlay: "Equal Opportunity Employment"
    },
    {
      title: "Inclusive Workplace<br />Culture", 
      text: "We believe that diverse perspectives drive innovation and creativity. Our inclusive environment ensures every voice is heard and valued.",
      overlay: "Collaborative Excellence"
    },
    {
      title: "Equal Growth<br />Opportunities",
      text: "Every employee deserves the chance to grow and succeed. We provide equal access to training, mentorship, and advancement opportunities.", 
      overlay: "Career Development"
    },
    {
      title: "Respectful<br />Environment",
      text: "We maintain a workplace free from discrimination and harassment, where all employees feel safe, respected, and empowered.",
      overlay: "Safe Workplace"
    },
    {
      title: "Community<br />Impact",
      text: "Our commitment extends beyond our walls. We actively engage with diverse communities, supporting local initiatives.",
      overlay: "Social Responsibility"
    }
  ];

  const images = [
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  useEffect(() => {
    // Load GSAP
    if (!window.gsap) {
      const script1 = document.createElement('script');
      script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      document.head.appendChild(script1);
      
      script1.onload = () => {
        const script2 = document.createElement('script');
        script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        document.head.appendChild(script2);
        
        script2.onload = () => {
          window.gsap.registerPlugin(window.ScrollTrigger);
          initAnimations();
        };
      };
    } else {
      initAnimations();
    }

    function initAnimations() {
      const { gsap, ScrollTrigger } = window;
      
      // Clear existing triggers
      ScrollTrigger.getAll().forEach(st => st.kill());

      // Initial positions for all images - maintaining aspect ratio 4:5 (width:height) for better height
      const positions = [
        { width: 320, height: 400, x: 0, y: 0, zIndex: 50, scale: 1 },
        { width: 288, height: 360, x: 80, y: 16, zIndex: 40, scale: 0.9 },
        { width: 256, height: 320, x: 160, y: 32, zIndex: 30, scale: 0.8 },
        { width: 224, height: 280, x: 240, y: 48, zIndex: 20, scale: 0.7 },
        { width: 192, height: 240, x: 320, y: 64, zIndex: 10, scale: 0.6 }
      ];

      // Set initial positions
      imagesRef.current.forEach((img, i) => {
        if (img && positions[i]) {
          gsap.set(img, {
            ...positions[i],
            transformOrigin: "center center"
          });
        }
      });

      // Pin section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        pinSpacing: true
      });

      // Master timeline for all animations
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%",
          scrub: 1,
          onUpdate: (self) => {
            const totalProgress = self.progress;
            const imageCount = images.length;
            const sectionProgress = totalProgress * (imageCount - 1);
            const currentSection = Math.floor(sectionProgress);
            const localProgress = sectionProgress - currentSection;

            // Calculate which images should be visible and their correct positions
            let visibleImages = [];
            
            // Determine current state based on scroll progress
            if (currentSection === 0 && localProgress === 0) {
              // Initial state - all images in original positions
              for (let i = 0; i < imageCount && i < positions.length; i++) {
                visibleImages.push({
                  index: i,
                  ...positions[i],
                  opacity: 1
                });
              }
            } else {
              // Calculate based on how many sections have been scrolled
              let activeImageIndex = 0;
              
              // Add images that are still active (not fully scrolled)
              for (let i = currentSection; i < imageCount && activeImageIndex < positions.length; i++) {
                if (i === currentSection) {
                  // Currently scrolling image - moves up and fades out
                  const baseZIndex = 60 + currentSection; // Increase zIndex for current scrolling image
                  visibleImages.push({
                    index: i,
                    ...positions[0],
                    y: positions[0].y - (500 * localProgress),
                    opacity: 1 - (localProgress * 0.4), // Reduced opacity fade (40% instead of 100%)
                    zIndex: baseZIndex // Highest zIndex for current scrolling image
                  });
                  activeImageIndex++;
                } else {
                  // Background images - should gradually increase in size and move forward
                  const positionIndex = activeImageIndex;
                  if (positionIndex < positions.length) {
                    if (i === currentSection + 1) {
                      // Next image transitioning to front position
                      const currentPos = positions[positionIndex] || positions[positions.length - 1];
                      const targetPos = positions[0]; // Always transition to front position
                      
                      // Gradually increase size and move to front
                      const sizeProgress = localProgress;
                      const baseZIndex = 50 - (activeImageIndex * 2); // Lower than scrolling image
                      
                      visibleImages.push({
                        index: i,
                        width: currentPos.width + (targetPos.width - currentPos.width) * sizeProgress,
                        height: currentPos.height + (targetPos.height - currentPos.height) * sizeProgress,
                        x: currentPos.x + (targetPos.x - currentPos.x) * sizeProgress,
                        y: currentPos.y + (targetPos.y - currentPos.y) * sizeProgress,
                        zIndex: baseZIndex,
                        scale: currentPos.scale + (targetPos.scale - currentPos.scale) * sizeProgress,
                        opacity: 1
                      });
                    } else {
                      // Other background images - gradually increase in size
                      const basePos = positions[positionIndex] || positions[positions.length - 1];
                      const nextPos = positions[positionIndex - 1] || positions[0];
                      
                      // Gradual size increase for background images
                      const backgroundProgress = localProgress * 0.3; // Slower growth rate
                      const baseZIndex = 45 - (activeImageIndex * 2); // Even lower zIndex
                      
                      visibleImages.push({
                        index: i,
                        width: basePos.width + (nextPos.width - basePos.width) * backgroundProgress,
                        height: basePos.height + (nextPos.height - basePos.height) * backgroundProgress,
                        x: basePos.x + (nextPos.x - basePos.x) * backgroundProgress * 0.1,
                        y: basePos.y + (nextPos.y - basePos.y) * backgroundProgress * 0.1,
                        zIndex: baseZIndex,
                        scale: basePos.scale + (nextPos.scale - basePos.scale) * backgroundProgress,
                        opacity: 1
                      });
                    }
                    activeImageIndex++;
                  }
                }
              }
            }

            // Reset all images first
            imagesRef.current.forEach((img) => {
              if (img) {
                gsap.set(img, {
                  opacity: 0,
                  y: -1000,
                  zIndex: 0
                });
              }
            });

            // Apply visible images - sort by zIndex to ensure proper layering
            visibleImages.sort((a, b) => a.zIndex - b.zIndex); // Sort by zIndex ascending (lower zIndex renders first/behind)
            
            visibleImages.forEach(imageData => {
              const img = imagesRef.current[imageData.index];
              if (img) {
                gsap.set(img, {
                  width: imageData.width,
                  height: imageData.height,
                  x: imageData.x,
                  y: imageData.y,
                  zIndex: imageData.zIndex,
                  scale: imageData.scale || 1,
                  opacity: imageData.opacity
                });
              }
            });

            // Update content - change when image has scrolled 65%
            let contentIndex;
            if (localProgress >= 0.65) {
              // After 65% scroll, show next content
              contentIndex = Math.min(currentSection + 1, contentData.length - 1);
            } else {
              // Before 65% scroll, show current content
              contentIndex = Math.min(currentSection, contentData.length - 1);
            }
            
            if (contentRef.current && contentData[contentIndex]) {
              const title = contentRef.current.children[0];
              const text = contentRef.current.children[1];
              
              if (title) title.innerHTML = contentData[contentIndex].title;
              if (text) text.textContent = contentData[contentIndex].text;
              
              // Update overlay text - always show on the front-most visible image
              const frontImage = visibleImages.find(img => img.zIndex === Math.max(...visibleImages.map(v => v.zIndex)));
              if (frontImage) {
                const overlay = imagesRef.current[frontImage.index]?.querySelector('.overlay-text');
                if (overlay) overlay.textContent = contentData[contentIndex].overlay;
              }
            }

            // Content animation
            const contentProgress = localProgress;
            if (contentRef.current) {
              gsap.set(contentRef.current.children[0], {
                y: -30 * contentProgress,
                opacity: 1 - contentProgress * 0.3
              });
              gsap.set(contentRef.current.children[1], {
                y: -20 * contentProgress,
                opacity: 1 - contentProgress * 0.3
              });
            }
          }
        }
      });
    }

    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(st => st.kill());
      }
    };
  }, []);

  return (
    <div style={{ height: '600vh' }}>
      <div ref={containerRef} className="flex items-center justify-between min-h-screen bg-gray-50 px-8 lg:px-16">
        
        {/* Left Content */}
        <div className="flex-1 max-w-xl pr-12">
          <div ref={contentRef}>
            <h1 className="text-5xl lg:text-6xl font-light text-black mb-8 leading-tight">
              Diversity & Inclusion<br />Policy
            </h1>
            <p className="text-gray-700 text-base leading-relaxed max-w-md">
              At Bhuma Cast Factory, we are committed to building a workplace that reflects the diversity of the communities we serve and fosters a culture of inclusion, respect, and equal opportunity.
            </p>
          </div>
        </div>

        {/* Right Images */}
        <div className="flex-1 relative flex justify-center items-center">
          <div className="relative w-96 h-96">
            {images.map((src, index) => (
              <div
                key={index}
                ref={el => imagesRef.current[index] = el}
                className="absolute rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={src}
                  alt={`Business ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white p-4">
                  <h3 className="text-lg font-medium overlay-text">Equal Opportunity Employment</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollContentImages;