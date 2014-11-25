#define WIDTH 80
#define HEIGHT 25

struct world {
  int cells[HEIGHT][WIDTH];
};

struct world w1, w2;

void
step(struct world *now, struct world *next) {
  int i, j;
  for (i = 1; i < HEIGHT - 1; i++)
    for (j = 1; j < WIDTH - 1; j++) {
      int neighbors = 0;
      int m, n;
      for (m = -1; m <= 1; m++)
        for (n = -1; n <= 1; n++)
          if (m || n)
            neighbors += now->cells[i + m][j + n];
      if (now->cells[i][j])
        next->cells[i][j] = (2 <= neighbors && neighbors <= 3);
      else
        next->cells[i][j] = neighbors == 3;
    }
}

void
show(struct world *w) {
  int i, j;
  for (i = 1; i < HEIGHT - 1; i++) {
    for (j = 1; j < WIDTH - 1; j++)
      putchar(w->cells[i][j] ? '*' : ' ');
    putchar('\n');
  }
  putchar('\n');
}

int main(int argc, char **argv) {
  w1.cells[10][39] = 1;
  w1.cells[10][40] = 1;
  w1.cells[10][41] = 1;
  w1.cells[11][41] = 1;
  w1.cells[12][40] = 1;

  show(&w1);
  step(&w1, &w2);
  show(&w2);
  step(&w2, &w1);
  show(&w1);
}
