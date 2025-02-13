import React, { useCallback } from 'react';
import { DotButton, useDotButton } from './EmblaCarouselDotButtons';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

const EmblaCarousel = (props) => {
  const { slides, options, onSelectProject } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;
    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi, onNavButtonClick);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="embla__slide" key={slide.key}>
              <div className="embla__slide__content">
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
                <button
                  className="mt-4 bg-primary text-white px-4 py-2 rounded"
                  onClick={() => onSelectProject(slide)}
                >
                  Détails
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <button className="embla__button" onClick={onPrevButtonClick} disabled={prevBtnDisabled}>
            &#9664; {/* Flèche gauche */}
          </button>
          <button className="embla__button" onClick={onNextButtonClick} disabled={nextBtnDisabled}>
            &#9654; {/* Flèche droite */}
          </button>
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={`dot-${index}`}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;