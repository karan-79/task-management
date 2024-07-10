package com.taskmaster.utils;


import java.util.function.Consumer;
import java.util.function.Supplier;

public class DbUtils {

     public static <T,E> void updateIfChanged(Supplier<E> supplier, Supplier<E> oldSupplier, Consumer<E> consumer) {
         var newVal = supplier.get();
         var oldVal = oldSupplier.get();

         if(newVal != null && newVal.equals(oldVal)) return;

         consumer.accept(newVal);
     }
}
