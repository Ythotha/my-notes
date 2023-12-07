<template>
  <main class="home">
    <div class="home__content">
      <h1 class="title title_first">Мои заметки</h1>
      <span class="home__text">
        Не забывай о важном,<br />
        храни его в облаке.
      </span>
    </div>
    <div class="home__img-wrapper">
      <img
        src="@/assets/img/home__img.svg"
        alt=""
        class="home__img"
        role="presentation"
      />
    </div>
  </main>
</template>

<script></script>

<style lang="postcss">
@import '@/assets/media.css';

.home {
  @media (--to-laptop) {
    text-align: center;
  }

  @media (--from-laptop) {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  &__text {
    display: block;
    margin-block-start: var(--home-text-margin);

    color: var(--color-gray);
    font-size: var(--home-text-font-size);
  }

  &__img-wrapper {
    align-self: flex-end;
    @media (--from-laptop) {
    }
  }

  &__img {
    display: inline-block;
    max-width: 100%;
  }
}
</style>
