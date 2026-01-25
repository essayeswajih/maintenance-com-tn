'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CarouselProps {
  items: React.ReactNode[]
  itemsPerView?: number
  autoplay?: boolean
  autoplayInterval?: number
}

export default function CarouselSlider({
  items,
  itemsPerView = 3,
  autoplay = false,
  autoplayInterval = 5000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Calculate total slides needed
  const totalSlides = Math.ceil(items.length / itemsPerView)

  const goToNext = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const goToPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      goToNext()
    }, autoplayInterval)

    return () => clearInterval(interval)
  }, [autoplay, autoplayInterval])

  const startIndex = currentIndex * itemsPerView
  const visibleItems = items.slice(startIndex, startIndex + itemsPerView)

  return (
    <div className="relative w-full">
      {/* Main Carousel Container */}
      <div className="overflow-hidden">
        <div
          className={`flex gap-6 transition-all duration-500 ${
            isAnimating ? 'opacity-75' : 'opacity-100'
          }`}
        >
          {visibleItems.map((item, index) => (
            <div
              key={`${currentIndex}-${index}`}
              className="flex-1 min-w-0 animate-fade-in-up"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 gap-4">
        <Button
          onClick={goToPrev}
          variant="outline"
          size="icon"
          className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 bg-transparent"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true)
                  setCurrentIndex(index)
                  setTimeout(() => setIsAnimating(false), 500)
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          onClick={goToNext}
          variant="outline"
          size="icon"
          className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 bg-transparent"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
