"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { getBooks, setBooks } from "@/lib/storage";
import type { Book, BookFormData } from "@/types/book";

const BOOKS_QUERY_KEY = ["books"];

export function useBooks() {
  return useQuery({
    queryKey: BOOKS_QUERY_KEY,
    queryFn: getBooks,
  });
}

export function useAddBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BookFormData) => {
      const books = getBooks();
      const newBook: Book = {
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      const updatedBooks = [...books, newBook];
      setBooks(updatedBooks);
      return newBook;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKS_QUERY_KEY });
    },
  });
}

export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<BookFormData>;
    }) => {
      const books = getBooks();
      const updatedBooks = books.map((book) =>
        book.id === id ? { ...book, ...data } : book,
      );
      setBooks(updatedBooks);
      return updatedBooks.find((b) => b.id === id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKS_QUERY_KEY });
    },
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const books = getBooks();
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKS_QUERY_KEY });
    },
  });
}
